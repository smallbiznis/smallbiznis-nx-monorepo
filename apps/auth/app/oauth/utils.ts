import { db } from "@/lib/db/client";
import { oauthClients, oauthTenantKeys } from "@/lib/db/schema";
import { readTenantFromRequest, TENANT_CONTEXT_HEADER } from "@/lib/tenant/context";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export type OAuthClientRecord = typeof oauthClients.$inferSelect;
export type OAuthTenantKeyRecord = typeof oauthTenantKeys.$inferSelect;

export const JSON_HEADERS = { "content-type": "application/json" } as const;

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export function jsonError(error: string, description?: string, status = 400) {
  const payload: Record<string, string> = { error };
  if (description) {
    payload.error_description = description;
  }

  return jsonResponse(payload, status);
}

export function parseNumericId(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    if (!value) return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  return null;
}

export async function getTenantContext(req: Request) {
  const ctx = readTenantFromRequest(req);
  return ctx ?? null;
}

export async function readFormBody(req: Request) {
  const text = await req.text();
  return new URLSearchParams(text);
}

export function parseScope(scope?: string | null) {
  if (!scope) return [] as string[];

  return scope
    .split(/\s+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export function scopeToString(scopes?: string[] | null) {
  return scopes && scopes.length ? scopes.join(" ") : "";
}

export async function findClient(tenantId: number, clientId: string) {
  const [client] = await db
    .select()
    .from(oauthClients)
    .where(and(eq(oauthClients.tenantId, tenantId), eq(oauthClients.clientId, clientId)))
    .limit(1);

  return client ?? null;
}

export async function findActiveTenantKey(tenantId: number) {
  const [key] = await db
    .select()
    .from(oauthTenantKeys)
    .where(and(eq(oauthTenantKeys.tenantId, tenantId), eq(oauthTenantKeys.isActive, true)))
    .limit(1);

  return key ?? null;
}

export function parseCookies(cookieHeader: string | null) {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;

  const pairs = cookieHeader.split(";");
  for (const part of pairs) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) continue;
    const value = rest.join("=");
    result[rawKey] = value ? decodeURIComponent(value) : "";
  }

  return result;
}

export function verifyClientSecret(expected: string, provided?: string | null) {
  if (!provided) return false;
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) {
    return false;
  }
  return timingSafeEqual(expectedBuf, providedBuf);
}
