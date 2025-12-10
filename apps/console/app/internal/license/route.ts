import { NextResponse, type NextRequest } from "next/server"

// Simple mock license endpoint to keep development self contained
const defaultFeatures = {
  subscription: true,
  meter: true,
  usage: false,
}

export async function GET(request: NextRequest) {
  const tenantId = request.nextUrl.searchParams.get("tenantId") ?? "unknown"
  const plan = tenantId === "enterprise" ? "enterprise" : "pro"

  const license = {
    tenantId,
    plan,
    valid: true,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    features: {
      ...defaultFeatures,
      usage: plan === "enterprise",
    },
  }

  return NextResponse.json(license)
}
