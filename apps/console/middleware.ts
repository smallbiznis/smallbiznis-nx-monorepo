// Middleware enforces tenant licensing before any app routes render
import { NextResponse, type NextRequest } from "next/server"
import { fetchTenantLicense } from "./lib/license"

// Map feature-specific routes to the license feature flag key
const featureRouteToLicenseKey: Record<string, string> = {
  meters: "meter",
  subscriptions: "subscription",
  usage: "usage",
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split("/").filter(Boolean)

  // Expected segments:
  // ["app", "tenantId", "feature"]
  if (segments[0] !== "app") {
    return NextResponse.next()
  }

  const tenantId = segments[1]
  const featureRoute = segments[2]

  if (!tenantId) {
    return NextResponse.next()
  }

  // Fetch license (server-side)
  const license = await fetchTenantLicense(tenantId, request.nextUrl.origin)

  if (!license?.valid) {
    return NextResponse.redirect(new URL("/license/error", request.url))
  }

  // Feature gating
  if (featureRoute) {
    const featureKey = featureRouteToLicenseKey[featureRoute]
    if (featureKey && !license.features?.[featureKey]) {
      const errorUrl = new URL(`/app/${tenantId}/error-license`, request.url)
      errorUrl.searchParams.set("feature", featureKey)
      return NextResponse.rewrite(errorUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/app/:path*"
  ],
}
