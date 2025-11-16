import { db } from "@/lib/db/client";
import { tenantUsers, users } from "@/lib/db/schema";
import { createSession } from "@/lib/auth/session";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { and, eq } from "drizzle-orm";
import { getTenantContext, jsonError, jsonResponse } from "@/app/oauth/utils";

export async function GET(req: Request) {
  const tenantContext = await getTenantContext(req);
  if (!tenantContext) {
    return jsonError("invalid_tenant", "Tenant is not available for this request", 400);
  }

  const redirect = new URL(req.url).searchParams.get("redirect") ?? undefined;
  return jsonResponse({
    message: "POST your email and password to authenticate.",
    tenant_id: tenantContext.tenantId,
    redirect,
  });
}

export async function POST(req: Request) {
  const tenantContext = await getTenantContext(req);
  if (!tenantContext) {
    return jsonError("invalid_tenant", "Tenant is not available for this request", 400);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonError("invalid_request", "Request body must be valid JSON");
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) {
    return jsonError("invalid_request", "email and password are required");
  }

  const tenantId = BigInt(String(tenantContext.id));
  const [record] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      passwordHash: users.passwordHash,
      tenantId: tenantUsers.tenantId,
    })
    .from(tenantUsers)
    .innerJoin(users, eq(tenantUsers.userId, users.id))
    .where(and(eq(tenantUsers.tenantId, tenantId), eq(users.email, email)))
    .limit(1);

  if (!record?.passwordHash) {
    return jsonError("invalid_credential", "Invalid email or password", 400);
  }

  const passwordValid = await verifyPassword(password, record.passwordHash);
  if (!passwordValid) {
    return jsonError("invalid_credential", "Invalid email or password", 400);
  }

  await createSession(record.id, tenantId);

  const redirectTarget = resolveRedirect(req);
  if (redirectTarget) {
    return Response.redirect(redirectTarget, 302);
  }

  return jsonResponse({
    user: {
      id: toNumber(record.id),
      email: record.email,
      name: record.name,
      tenant_id: toNumber(tenantId),
    },
  });
}

function resolveRedirect(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("redirect");
  if (!target || !target.startsWith("/")) {
    return null;
  }
  if (target.startsWith("//")) {
    return null;
  }
  return new URL(target, url.origin);
}

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}
