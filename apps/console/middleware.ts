import { NextResponse, type NextRequest } from "next/server"

import { isFeatureEnabled, type License, resetLicenseCache } from "./lib/license"

const featureRouteToLicenseKey: Record<string, string> = {
  customers: "customers",
  meters: "meter",
  subscriptions: "subscriptions",
  usage: "usage",
  workflow: "workflow",
}

let middlewareLicense: License | null = null

async function getMiddlewareLicense(origin: string): Promise<License> {
  if (!middlewareLicense) {
    middlewareLicense = await fetchLicense(origin)
  }
  return middlewareLicense
}

async function fetchLicense(origin: string): Promise<License> {
  const response = await fetch(`${origin}/internal/license`, { cache: "no-store" })
  if (!response.ok) {
    resetLicenseCache()
    throw new Error("license unavailable")
  }
  return (await response.json()) as License
}

function isStaticPath(pathname: string) {
  return pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/internal")
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  if (isStaticPath(pathname)) {
    return NextResponse.next()
  }

  const segments = pathname.split("/").filter(Boolean)

  if (segments[0] !== "app") {
    return NextResponse.next()
  }

  const tenantId = segments[1]
  const featureRoute = segments[2]

  try {
    const license = await getMiddlewareLicense(origin)

    if (!license.valid) {
      return NextResponse.redirect(new URL("/license/error", request.url))
    }

    if (featureRoute) {
      const featureKey = featureRouteToLicenseKey[featureRoute]
      if (featureKey && !isFeatureEnabled(license, featureKey)) {
        const errorUrl = new URL(`/app/${tenantId}/error-license`, request.url)
        errorUrl.searchParams.set("feature", featureKey)
        return NextResponse.redirect(errorUrl)
      }
    }
  } catch (_error) {
    return NextResponse.redirect(new URL("/license/error", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/app/:path*"],
}
