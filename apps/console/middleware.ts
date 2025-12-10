// Middleware enforces tenant licensing before any app routes render
import { NextResponse, type NextRequest } from "next/server"
import { fetchTenantLicense } from "@/lib/license"

// Map feature-specific routes to the license feature flag key
const featureRouteToLicenseKey: Record<string, string> = {
  meters: "meter",
  subscriptions: "subscription",
  usage: "usage",
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split("/").filter(Boolean)

  const tenantId = segments[0]
  const ignoredFirstSegments = new Set([
    "_next",
    "api",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
    "license",
  ])

  const looksLikeAsset = tenantId?.includes(".")

  // Allow static assets and non-tenant routes to continue
  if (!tenantId || ignoredFirstSegments.has(tenantId) || looksLikeAsset) {
    return NextResponse.next()
  }

  // Pull current license snapshot for the tenant
  const license = await fetchTenantLicense(tenantId, request.nextUrl.origin)
  if (!license?.valid) {
    return NextResponse.redirect(new URL("/license/error", request.url))
  }

  const featureRoute = segments[1]
  if (featureRoute) {
    const featureKey = featureRouteToLicenseKey[featureRoute]
    if (featureKey && !license.features?.[featureKey]) {
      // Forward feature-locked tenants to a friendly upgrade view
      const errorUrl = new URL(`/${tenantId}/error-license`, request.url)
      errorUrl.searchParams.set("reason", "feature")
      errorUrl.searchParams.set("feature", featureKey)
      return NextResponse.rewrite(errorUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}
