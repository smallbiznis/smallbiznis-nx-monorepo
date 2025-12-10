export type LicenseEdition = "enterprise" | "community" | string

export interface License {
  valid: boolean
  edition: LicenseEdition
  features: Record<string, boolean>
  expires_at?: string
}

let cachedLicensePromise: Promise<License> | null = null

function normalizeLicense(payload: Partial<License>): License {
  return {
    valid: Boolean(payload.valid),
    edition: payload.edition ?? "community",
    features: payload.features ?? {},
    expires_at: payload.expires_at,
  }
}

async function fetchLicense(baseUrl?: string): Promise<License> {
  const resolvedBase = baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4200"
  const url = new URL("/internal/license", resolvedBase)
  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`license endpoint returned ${response.status}`)
  }

  const payload = (await response.json()) as Partial<License>
  return normalizeLicense(payload)
}

export async function getGlobalLicense(baseUrl?: string): Promise<License> {
  if (!cachedLicensePromise) {
    cachedLicensePromise = fetchLicense(baseUrl)
  }
  try {
    return await cachedLicensePromise
  } catch (error) {
    cachedLicensePromise = null
    throw error
  }
}

export function resetLicenseCache() {
  cachedLicensePromise = null
}

export function isFeatureEnabled(license: License | null, featureKey: string) {
  if (!license?.valid) return false
  return Boolean(license.features?.[featureKey])
}
