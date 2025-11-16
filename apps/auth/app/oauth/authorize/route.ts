import { db } from "@/lib/db/client";
import { oauthCodes } from "@/lib/db/schema";
import { getSessionUser } from "@/lib/auth/session";
import { findClient, getTenantContext, jsonError } from "../utils";
import { randomBytes } from "node:crypto";

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function GET(req: Request) {
  const context = getTenantContext(req);
  if (!context) {
    return jsonError("invalid_request", "Tenant context was not resolved", 400);
  }

  try {
    const { tenantId } = context;
    const url = new URL(req.url);
    const params = url.searchParams;

    const responseType = params.get("response_type");
    const clientId = params.get("client_id");
    const redirectUri = params.get("redirect_uri");
    const state = params.get("state");
    const codeChallenge = params.get("code_challenge");
    const codeChallengeMethod = params.get("code_challenge_method");

    if (responseType !== "code") {
      return jsonError("unsupported_response_type", "response_type must be `code`");
    }

    if (!clientId || !redirectUri || !state) {
      return jsonError("invalid_request", "client_id, redirect_uri, and state are required");
    }

    let redirectUrl: URL;
    try {
      redirectUrl = new URL(redirectUri);
    } catch {
      return jsonError("invalid_request", "redirect_uri must be a valid URL");
    }

    const client = await findClient(tenantId, clientId);
    if (!client) {
      return jsonError("invalid_client", "Unknown client_id", 401);
    }

    const registeredUris = client.redirectUris ?? [];
    if (!registeredUris.includes(redirectUri)) {
      return jsonError("invalid_request", "redirect_uri is not registered for this client");
    }

    const sessionUser = await getSessionUser(req);
    if (!sessionUser) {
      const loginRedirect = buildLoginRedirect(url);
      return Response.redirect(loginRedirect, 302);
    }

    const code = randomBytes(20).toString("hex");
    const expiresAt = new Date(Date.now() + CODE_TTL_MS);

    await db.insert(oauthCodes).values({
      tenantId,
      clientId: client.clientId,
      userId: sessionUser.id,
      code,
      redirectUri,
      codeChallenge: codeChallenge ?? null,
      codeChallengeMethod: codeChallengeMethod ?? null,
      expiresAt,
    });

    redirectUrl.searchParams.set("code", code);
    redirectUrl.searchParams.set("state", state);

    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonError("server_error", message, 500);
  }
}

function buildLoginRedirect(currentUrl: URL) {
  const redirectPath = `/oauth/authorize${currentUrl.search}`;
  const loginUrl = new URL("/auth/login", currentUrl.origin);
  loginUrl.searchParams.set("redirect", redirectPath);
  return loginUrl;
}
