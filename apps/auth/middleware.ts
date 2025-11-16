import { NextRequest, NextResponse } from "next/server";
import { TENANT_CONTEXT_HEADER, encodePayload } from "./lib/tenant/context";

const TENANT_RESOLVE_ENDPOINT = "/api/internal/tenants/resolve";

export async function middleware(req: NextRequest) {
  const host = req.nextUrl.host;

  const lookupUrl = new URL(TENANT_RESOLVE_ENDPOINT, req.url);
  lookupUrl.searchParams.set("host", host);

  const tenantRes = await fetch(lookupUrl, { cache: "no-store" });
  const json = await tenantRes.json();
  const tenant = json.tenant;

  if (!tenant) {
    return NextResponse.json({ error: "Invalid tenant" }, { status: 400 });
  }

  // 🔥 copy the original request headers
  const requestHeaders = new Headers(req.headers);

  // 🔥 inject tenant context
  requestHeaders.set(TENANT_CONTEXT_HEADER, encodePayload(tenant));

  // 🔥 pass modified headers to the route handler
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/oauth/:path*", "/auth/:path*", "/api/auth/:path*"],
};
