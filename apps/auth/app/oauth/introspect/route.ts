import { db } from "@/lib/db/client";
import { oauthTokens } from "@/lib/db/schema";
import {
  findClient,
  getTenantContext,
  jsonError,
  jsonResponse,
  parseNumericId,
  readFormBody,
  scopeToString,
  verifyClientSecret,
} from "../utils";
import { and, eq, or } from "drizzle-orm";

export async function POST(req: Request) {
  const context = getTenantContext(req);
  if (!context) {
    return jsonError("invalid_request", "Tenant context was not resolved", 400);
  }

  try {
    const { tenantId } = context;
    const params = await readFormBody(req);
    const tokenValue = params.get("token");
    const clientId = params.get("client_id");
    const clientSecret = params.get("client_secret");

    if (!tokenValue || !clientId) {
      return jsonResponse({ active: false });
    }

    const client = await findClient(tenantId, clientId);
    if (!client) {
      return jsonResponse({ active: false });
    }

    if (clientSecret && !verifyClientSecret(client.clientSecret, clientSecret)) {
      return jsonResponse({ active: false });
    }

    const [tokenRecord] = await db
      .select()
      .from(oauthTokens)
      .where(
        and(
          eq(oauthTokens.tenantId, tenantId),
          or(
            eq(oauthTokens.accessToken, tokenValue),
            eq(oauthTokens.refreshToken, tokenValue),
          ),
        ),
      )
      .limit(1);

    if (!tokenRecord) {
      return jsonResponse({ active: false });
    }

    if (tokenRecord.clientId !== client.clientId || tokenRecord.revoked) {
      return jsonResponse({ active: false });
    }

    const isAccessToken = tokenRecord.accessToken === tokenValue;
    if (isAccessToken && tokenRecord.expiresAt.getTime() <= Date.now()) {
      return jsonResponse({ active: false });
    }

    const response: Record<string, unknown> = {
      active: true,
      client_id: tokenRecord.clientId,
      tenant_id: tokenRecord.tenantId,
      exp: Math.floor(tokenRecord.expiresAt.getTime() / 1000),
    };

    const subject = parseNumericId(tokenRecord.userId);
    if (subject != null) {
      response.sub = String(subject);
    }

    const scope = scopeToString(tokenRecord.scopes);
    if (scope) {
      response.scope = scope;
    }

    return jsonResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonError("server_error", message, 500);
  }
}
