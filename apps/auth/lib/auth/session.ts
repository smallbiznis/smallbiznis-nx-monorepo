import { cookies } from "next/headers";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { db } from "@/lib/db/client";
import { tenantUsers, users } from "@/lib/db/schema";
import { extractTenantIdValue, readTenantFromRequest } from "@/lib/tenant/context";
import { and, eq } from "drizzle-orm";

const SESSION_COOKIE_NAME = "sb_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

let cachedKey: Buffer | null = null;

type SessionPayload = {
  userId: string;
  tenantId: string;
  expiresAt: number;
};

export type SessionUser = {
  id: number;
  email: string;
  name: string | null;
  tenantId: number;
};

export async function createSession(userId: string | number | bigint, tenantId: string | number | bigint) {
  const normalizedUserId = normalizeId(userId);
  const normalizedTenantId = normalizeId(tenantId);
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload: SessionPayload = {
    userId: normalizedUserId,
    tenantId: normalizedTenantId,
    expiresAt,
  };

  const token = encryptPayload(payload);
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return payload;
}

export async function destroySession(_req?: Request) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const payload = readSessionPayload(req);
  if (!payload) {
    return null;
  }

  if (payload.expiresAt <= Date.now()) {
    await destroySession(req);
    return null;
  }

  const tenantFromRequest = extractTenantId(req);
  if (tenantFromRequest && tenantFromRequest !== payload.tenantId) {
    return null;
  }

  const tenantId = toBigInt(payload.tenantId);
  const userId = toBigInt(payload.userId);
  if (tenantId === null || userId === null) {
    await destroySession(req);
    return null;
  }

  const [record] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      tenantId: tenantUsers.tenantId,
    })
    .from(tenantUsers)
    .innerJoin(users, eq(tenantUsers.userId, users.id))
    .where(and(eq(tenantUsers.tenantId, tenantId), eq(users.id, userId)))
    .limit(1);

  if (!record) {
    await destroySession(req);
    return null;
  }

  return {
    id: toNumber(record.id),
    email: record.email,
    name: record.name ?? null,
    tenantId: toNumber(record.tenantId),
  };
}

function readSessionPayload(req: Request): SessionPayload | null {
  const cookiesHeader = req.headers.get("cookie");
  if (!cookiesHeader) return null;

  const token = extractCookieValue(cookiesHeader, SESSION_COOKIE_NAME);
  if (!token) return null;

  try {
    const decrypted = decryptPayload(token);
    const parsed = JSON.parse(decrypted) as Partial<SessionPayload>;
    if (!parsed || typeof parsed.userId !== "string" || typeof parsed.tenantId !== "string") {
      return null;
    }
    if (typeof parsed.expiresAt !== "number") {
      return null;
    }
    return {
      userId: parsed.userId,
      tenantId: parsed.tenantId,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

function extractCookieValue(header: string, name: string) {
  const parts = header.split(";");
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) continue;
    if (rawKey === name) {
      return rest.length ? decodeURIComponent(rest.join("=")) : "";
    }
  }
  return null;
}

function encryptPayload(payload: SessionPayload) {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64url");
}

function decryptPayload(token: string) {
  const buffer = Buffer.from(token, "base64url");
  if (buffer.length < IV_LENGTH + AUTH_TAG_LENGTH) {
    throw new Error("Invalid session token");
  }
  const iv = buffer.subarray(0, IV_LENGTH);
  const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}

function getEncryptionKey() {
  if (cachedKey) return cachedKey;
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable must be set");
  }
  cachedKey = createHash("sha256").update(secret).digest();
  return cachedKey;
}

function normalizeId(value: string | number | bigint): string {
  if (typeof value === "string") {
    if (!value) throw new Error("Identifier cannot be empty");
    return value;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Invalid identifier");
    return Math.trunc(value).toString();
  }
  return value.toString();
}

function toBigInt(value: string): bigint | null {
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function extractTenantId(req: Request): string | null {
  const tenant = readTenantFromRequest(req);
  return extractTenantIdValue(tenant);
}
