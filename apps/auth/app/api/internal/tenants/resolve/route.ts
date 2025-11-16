import { NextResponse } from "next/server";
import { resolveTenantByHost } from "@/lib/tenant/resolve-host";
import { normalizePayload } from "@/lib/tenant/context";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const host = url.searchParams.get("host");

  if (!host) {
    return NextResponse.json({ error: "host query parameter is required" }, { status: 400 });
  }

  let tenant = null;

  try {
    tenant = await resolveTenantByHost(host);
  } catch (error) {
    console.error("Tenant host resolution failed", error);
    return NextResponse.json({ error: "Unable to resolve tenant context" }, { status: 500 });
  }

  if (!tenant) {
    return NextResponse.json({ tenant: null }, { status: 404 });
  }

  return NextResponse.json({ tenant: normalizePayload(tenant) });
}
