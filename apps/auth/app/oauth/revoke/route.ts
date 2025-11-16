import { db } from "@/lib/db/client";
import { oauthTokens } from "@/lib/db/schema";
import {
  findClient,
  getTenantContext,
  jsonError,
  jsonResponse,
  readFormBody,
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

    if (!tokenValue || !clientId || !clientSecret) {
      return jsonError("invalid_request", "token, client_id, and client_secret are required");
    }

    const client = await findClient(tenantId, clientId);
    if (!client || !verifyClientSecret(client.clientSecret, clientSecret)) {
      return jsonError("invalid_client", "Client authentication failed", 401);
    }

    await db
      .update(oauthTokens)
      .set({ revoked: true })
      .where(
        and(
          eq(oauthTokens.tenantId, tenantId),
          eq(oauthTokens.clientId, client.clientId),
          or(
            eq(oauthTokens.accessToken, tokenValue),
            eq(oauthTokens.refreshToken, tokenValue),
          ),
        ),
      );

    return jsonResponse({ revoked: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return jsonError("server_error", message, 500);
  }
}
