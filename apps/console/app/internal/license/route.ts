import { NextResponse, type NextRequest } from "next/server"

import type { License } from "@/lib/license"

let cachedLicense: License | null = null
let cachedAt: number | null = null

const SERVICE_BASE_URL = process.env.LICENSE_SERVICE_URL ?? "http://127.0.0.1:8080"
const CACHE_TTL_MS = 5 * 60 * 1000

async function fetchDeploymentLicense() {
  const response = await fetch(new URL("/internal/license", SERVICE_BASE_URL).toString(), {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`license service returned ${response.status}`)
  }

  const payload = (await response.json()) as License
  cachedLicense = payload
  cachedAt = Date.now()
  return payload
}

async function getCachedLicenseSnapshot() {
  if (cachedLicense && cachedAt && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedLicense
  }
  return fetchDeploymentLicense()
}

export async function GET(_request: NextRequest) {
  try {
    const license = await getCachedLicenseSnapshot()
    const status = license.valid ? 200 : 403
    return NextResponse.json(license, { status })
  } catch (error) {
    return NextResponse.json(
      {
        valid: false,
        edition: "unknown",
        features: {},
        error: error instanceof Error ? error.message : "license unavailable",
      },
      { status: 500 },
    )
  }
}
