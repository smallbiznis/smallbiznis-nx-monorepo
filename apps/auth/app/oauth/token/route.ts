import { db } from "@/lib/db/client";
import { oauthCodes, oauthTokens } from "@/lib/db/schema";
import {
  findActiveTenantKey,
  findClient,
  getTenantContext,
  jsonError,
  jsonResponse,
  parseNumericId,
  parseScope,
  readFormBody,
  verifyClientSecret,
} from "../utils";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const ACCESS_TOKEN_EXPIRES_IN = 3600; // seconds
const REFRESH_TOKEN_BYTES = 48;

export async function POST(req: Request) {
  const context = getTenantContext(req);
  if (!context) {
    return jsonError("invalid_request", "Tenant context was not resolved", 400);
  }

  try {
    const { tenantId } = context;
    const params = await readFormBody(req);
    const grantType = params.get("grant_type");

    if (!grantType) {
      return jsonError("invalid_request", "grant_type is required");
    }

    if (grantType === "authorization_code") {
      return handleAuthorizationCodeGrant(tenantId, params);
    }

    if (grantType === "refresh_token") {
      return handleRefreshTokenGrant(tenantId, params);
    }

    if (grantType === "client_credentials") {
      return handleClientCredentialsGrant(tenantId, params);
    }

    return jsonError("unsupported_grant_type", "grant_type is not supported");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonError("server_error", message, 500);
  }
}

async function handleAuthorizationCodeGrant(tenantId: number, params: URLSearchParams) {
  const clientId = params.get("client_id");
  const clientSecret = params.get("client_secret");
  const codeValue = params.get("code");
  const redirectUri = params.get("redirect_uri");
  const codeVerifier = params.get("code_verifier");
  const requestedScopes = parseScope(params.get("scope"));

  if (!clientId || !clientSecret || !codeValue || !redirectUri) {
    return jsonError(
      "invalid_request",
      "client_id, client_secret, code, and redirect_uri are required",
    );
  }

  const client = await findClient(tenantId, clientId);
  if (!client) {
    return jsonError("invalid_client", "Unknown client_id", 401);
  }

  if (!verifyClientSecret(client.clientSecret, clientSecret)) {
    return jsonError("invalid_client", "Client authentication failed", 401);
  }

  const [codeRecord] = await db
    .select()
    .from(oauthCodes)
    .where(and(eq(oauthCodes.tenantId, tenantId), eq(oauthCodes.code, codeValue)))
    .limit(1);

  if (!codeRecord) {
    return jsonError("invalid_grant", "Authorization code is invalid");
  }

  if (codeRecord.used) {
    return jsonError("invalid_grant", "Authorization code has already been used");
  }

  if (codeRecord.clientId !== client.clientId) {
    return jsonError("invalid_grant", "Authorization code not issued for this client");
  }

  if (codeRecord.redirectUri !== redirectUri) {
    return jsonError("invalid_grant", "redirect_uri does not match initial request");
  }

  if (codeRecord.expiresAt.getTime() <= Date.now()) {
    return jsonError("invalid_grant", "Authorization code has expired");
  }

  if (!validatePkce(codeRecord.codeChallenge, codeRecord.codeChallengeMethod, codeVerifier)) {
    return jsonError("invalid_grant", "PKCE verification failed");
  }

  const scopes = resolveScopes(requestedScopes, client.scopes);
  if (scopes instanceof Error) {
    return jsonError("invalid_scope", scopes.message);
  }

  const signingKey = await findActiveTenantKey(tenantId);
  if (!signingKey) {
    return jsonError("server_error", "Signing key is not configured for this tenant", 500);
  }

  const subject = parseNumericId(codeRecord.userId);
  const payload = buildAccessTokenPayload({ tenantId, clientId: client.clientId, userId: subject, scopes });
  const accessToken = signJwt(payload, signingKey, ACCESS_TOKEN_EXPIRES_IN);
  const refreshToken = generateRefreshToken();

  const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000);

  const [updatedCode] = await db
    .update(oauthCodes)
    .set({ used: true })
    .where(and(eq(oauthCodes.id, codeRecord.id), eq(oauthCodes.used, false)))
    .returning({ id: oauthCodes.id });

  if (!updatedCode) {
    return jsonError("invalid_grant", "Authorization code is no longer valid");
  }

  await db.insert(oauthTokens).values({
    tenantId,
    clientId: client.clientId,
    userId: subject,
    accessToken,
    refreshToken,
    scopes,
    expiresAt,
  });

  return jsonResponse(buildTokenResponse(accessToken, refreshToken, scopes));
}

async function handleRefreshTokenGrant(tenantId: number, params: URLSearchParams) {
  const clientId = params.get("client_id");
  const clientSecret = params.get("client_secret");
  const refreshTokenValue = params.get("refresh_token");
  const requestedScopes = parseScope(params.get("scope"));

  if (!clientId || !clientSecret || !refreshTokenValue) {
    return jsonError("invalid_request", "client_id, client_secret, and refresh_token are required");
  }

  const client = await findClient(tenantId, clientId);
  if (!client) {
    return jsonError("invalid_client", "Unknown client_id", 401);
  }

  if (!verifyClientSecret(client.clientSecret, clientSecret)) {
    return jsonError("invalid_client", "Client authentication failed", 401);
  }

  const [tokenRecord] = await db
    .select()
    .from(oauthTokens)
    .where(
      and(
        eq(oauthTokens.tenantId, tenantId),
        eq(oauthTokens.refreshToken, refreshTokenValue),
        eq(oauthTokens.clientId, client.clientId),
        eq(oauthTokens.revoked, false),
      ),
    )
    .limit(1);

  if (!tokenRecord) {
    return jsonError("invalid_grant", "refresh_token is invalid or has been revoked");
  }

  const scopes = resolveScopes(requestedScopes, tokenRecord.scopes);
  if (scopes instanceof Error) {
    return jsonError("invalid_scope", scopes.message);
  }

  const signingKey = await findActiveTenantKey(tenantId);
  if (!signingKey) {
    return jsonError("server_error", "Signing key is not configured for this tenant", 500);
  }

  const subject = parseNumericId(tokenRecord.userId);
  const payload = buildAccessTokenPayload({
    tenantId,
    clientId: client.clientId,
    userId: subject,
    scopes,
  });

  const accessToken = signJwt(payload, signingKey, ACCESS_TOKEN_EXPIRES_IN);
  const refreshToken = generateRefreshToken();
  const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000);

  await db
    .update(oauthTokens)
    .set({ revoked: true })
    .where(eq(oauthTokens.id, tokenRecord.id));

  await db.insert(oauthTokens).values({
    tenantId,
    clientId: client.clientId,
    userId: subject,
    accessToken,
    refreshToken,
    scopes,
    expiresAt,
  });

  return jsonResponse(buildTokenResponse(accessToken, refreshToken, scopes));
}

async function handleClientCredentialsGrant(tenantId: number, params: URLSearchParams) {
  const clientId = params.get("client_id");
  const clientSecret = params.get("client_secret");
  const requestedScopes = parseScope(params.get("scope"));

  if (!clientId || !clientSecret) {
    return jsonError("invalid_request", "client_id and client_secret are required");
  }

  const client = await findClient(tenantId, clientId);
  if (!client) {
    return jsonError("invalid_client", "Unknown client_id", 401);
  }

  if (!verifyClientSecret(client.clientSecret, clientSecret)) {
    return jsonError("invalid_client", "Client authentication failed", 401);
  }

  const scopes = resolveScopes(requestedScopes, client.scopes);
  if (scopes instanceof Error) {
    return jsonError("invalid_scope", scopes.message);
  }

  const signingKey = await findActiveTenantKey(tenantId);
  if (!signingKey) {
    return jsonError("server_error", "Signing key is not configured for this tenant", 500);
  }

  const payload = buildAccessTokenPayload({ tenantId, clientId: client.clientId, scopes });
  const accessToken = signJwt(payload, signingKey, ACCESS_TOKEN_EXPIRES_IN);
  const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000);

  await db.insert(oauthTokens).values({
    tenantId,
    clientId: client.clientId,
    userId: null,
    accessToken,
    refreshToken: null,
    scopes,
    expiresAt,
  });

  return jsonResponse(buildTokenResponse(accessToken, undefined, scopes));
}

function resolveScopes(requested: string[], allowed?: string[] | null) {
  const allowedList = allowed ?? [];
  if (requested.length === 0) {
    return allowedList;
  }

  if (allowedList.length === 0) {
    return requested;
  }

  const disallowed = requested.filter((scope) => !allowedList.includes(scope));
  if (disallowed.length) {
    return new Error(`Invalid scope: ${disallowed.join(", ")}`);
  }

  return requested;
}

function buildAccessTokenPayload({
  tenantId,
  clientId,
  userId,
  scopes,
}: {
  tenantId: number;
  clientId: string;
  userId?: number | null;
  scopes: string[];
}) {
  const payload: Record<string, unknown> = {
    client_id: clientId,
    tenant_id: tenantId,
  };

  if (userId != null) {
    payload.sub = String(userId);
  }

  if (scopes.length) {
    payload.scope = scopes.join(" ");
  }

  return payload;
}

function signJwt(payload: Record<string, unknown>, key: { secret: string; algo: string; kid: string | null }, expiresIn: number) {
  const algorithm = (key.algo as jwt.Algorithm) || "HS256";
  return jwt.sign(payload, key.secret, {
    algorithm,
    expiresIn,
    keyid: key.kid ?? undefined,
  });
}

function generateRefreshToken() {
  return randomBytes(REFRESH_TOKEN_BYTES).toString("hex");
}

function buildTokenResponse(accessToken: string, refreshToken: string | undefined, scopes: string[]) {
  const body: Record<string, unknown> = {
    access_token: accessToken,
    token_type: "bearer",
    expires_in: ACCESS_TOKEN_EXPIRES_IN,
  };

  if (refreshToken) {
    body.refresh_token = refreshToken;
  }

  if (scopes.length) {
    body.scope = scopes.join(" ");
  }

  return body;
}

function validatePkce(challenge: string | null, method: string | null, verifier: string | null) {
  if (!challenge) {
    return true;
  }

  if (!verifier) {
    return false;
  }

  const normalizedMethod = (method || "plain").toUpperCase();
  if (normalizedMethod === "PLAIN") {
    return challenge === verifier;
  }

  if (normalizedMethod === "S256") {
    const digest = createHash("sha256").update(verifier).digest();
    const encoded = base64UrlEncode(digest);
    return timingSafeCompare(encoded, challenge);
  }

  return false;
}

function base64UrlEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function timingSafeCompare(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}
