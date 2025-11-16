import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { tenantDomains, tenants } from "../db/schema";

function normalizeDomain(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "";

  // Attempt to parse via WHATWG URL to strip schemes/ports reliably.
  try {
    const parsed = new URL(trimmed.includes("://") ? trimmed : `http://${trimmed}`);
    return parsed.hostname.toLowerCase();
  } catch {
    // Fallback: best-effort split on ":" to drop ports (e.g., localhost:3000).
    return trimmed.split(":")[0]?.toLowerCase() ?? "";
  }
}

export async function resolveTenantByHost(host: string): any {
  const result = await db
    .select({
      tenantId: tenantDomains.tenantId,
      isPrimary: tenantDomains.isPrimary,
      verified: tenantDomains.verified,
      status: tenantDomains.provisioningStatus,
    })
    .from(tenantDomains)
    .where(eq(tenantDomains.domain, host))
    .limit(1);

  if (result.length === 0) return null;

  const d = result[0];

  // hanya izinkan domain yang sudah diverifikasi & provisioning OK
  if (!d.verified || d.status !== "active") return null;

  const tenant = await db
    .select()
    .from(tenants)
    .where(eq(tenants.id, d.tenantId))
    .limit(1);

  return tenant[0] ?? null;
}
