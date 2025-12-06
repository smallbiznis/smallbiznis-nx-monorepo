import { NextResponse } from "next/server";
import { resolveTenantIdFromRequest } from "@/lib/tenant/resolve-tenant";
import { normalizePayload } from "@/lib/tenant/context";

export const runtime = "nodejs";

export async function GET(req: Request) {
  let tenant = null;

  try {
    tenant = await resolveTenantIdFromRequest(req);
  } catch (error) {
    console.error("Tenant host resolution failed", error);
    return NextResponse.json({ error: "Unable to resolve tenant context" }, { status: 500 });
  }

  if (!tenant) {
    return NextResponse.json({ tenant: null }, { status: 404 });
  }

  return NextResponse.json({ tenant: normalizePayload(tenant) });
}
