import { db } from "../db/client";
import { oauthClients, oauthTokens, oauthCodes } from "../db/schema";
import { eq, and } from "drizzle-orm";
import jwt from "jsonwebtoken";

// find client
export async function findOAuthClient(tenantId: number, clientId: string) {
  const res = await db
    .select()
    .from(oauthClients)
    .where(
      and(eq(oauthClients.tenantId, tenantId), eq(oauthClients.clientId, clientId))
    )
    .limit(1);

  return res[0] ?? null;
}

// verify authorization code
export async function verifyAuthorizationCode(tenantId: number, code: string) {
  const res = await db
    .select()
    .from(oauthCodes)
    .where(
      and(eq(oauthCodes.tenantId, tenantId), eq(oauthCodes.code, code))
    )
    .limit(1);

  return res[0] ?? null;
}

// generate token
export function generateAccessToken(payload: any, signingKey: string) {
  return jwt.sign(payload, signingKey, { expiresIn: "1h" });
}

export function generateRefreshToken() {
  return crypto.randomUUID() + crypto.randomUUID();
}

// save token
export async function saveTokenRecord(data: any) {
  await db.insert(oauthTokens).values(data);
}
