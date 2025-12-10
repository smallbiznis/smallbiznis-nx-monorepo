export type FeatureFlags = Record<string, boolean>

const featureFlagsCache = new Map<string, Promise<FeatureFlags>>()

function resolveBaseUrl(baseUrl?: string) {
  return baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4200"
}

async function fetchTenantFeatureFlags(tenantId: string, baseUrl?: string): Promise<FeatureFlags> {
  const resolvedBase = resolveBaseUrl(baseUrl)
  const url = new URL("/internal/tenant/features", resolvedBase)
  url.searchParams.set("tenantId", tenantId)

  const response = await fetch(url.toString(), { cache: "no-store" })
  if (!response.ok) {
    throw new Error(`feature flags endpoint returned ${response.status}`)
  }

  const payload = (await response.json()) as FeatureFlags | null
  return payload ?? {}
}

export async function getTenantFeatureFlags(tenantId: string, baseUrl?: string): Promise<FeatureFlags> {
  const cacheKey = `${baseUrl ?? "default"}::${tenantId}`
  const cached = featureFlagsCache.get(cacheKey)

  if (cached) {
    try {
      return await cached
    } catch (error) {
      featureFlagsCache.delete(cacheKey)
      throw error
    }
  }

  const pendingFetch = fetchTenantFeatureFlags(tenantId, baseUrl)
  featureFlagsCache.set(cacheKey, pendingFetch)

  try {
    return await pendingFetch
  } catch (error) {
    featureFlagsCache.delete(cacheKey)
    throw error
  }
}

export function resetFeatureFlagsCache() {
  featureFlagsCache.clear()
}
