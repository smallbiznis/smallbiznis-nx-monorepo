import { cache } from "react"

// Shared license typing used across middleware, layouts, and page guards

export type LicenseFeatureKey = "subscription" | "meter" | "usage" | string

export interface License {
  tenantId: string
  plan: string
  valid: boolean
  expiresAt?: string
  features?: Record<LicenseFeatureKey, boolean>
}

const LICENSE_API_BASE = process.env.LICENSE_API_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL

// Fetch license with simple caching to avoid duplicate upstream calls per request lifecycle
// Server-side helper to pull the latest license snapshot for a tenant
export const fetchTenantLicense = cache(async (
  tenantId: string,
  baseUrl?: string,
): Promise<License | null> => {
  if (!tenantId) return null

  const resolvedBase = baseUrl ?? LICENSE_API_BASE ?? "http://localhost:3000"
  const licenseUrl = new URL(`/internal/license?tenantId=${encodeURIComponent(tenantId)}`, resolvedBase)

  const response = await fetch(licenseUrl, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as License
  return payload ?? null
})

// Server/client guard to short-circuit when a feature is not present on the license
export function assertFeature(license: License | null, featureKey: LicenseFeatureKey) {
  if (!license?.features?.[featureKey]) {
    throw new Error("FEATURE_NOT_ALLOWED")
  }
}
