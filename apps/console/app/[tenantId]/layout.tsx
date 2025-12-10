import { headers } from "next/headers"
import type { ReactNode } from "react"

import { FeatureFlagsProvider } from "@/lib/FeatureFlagsProvider"
import { getTenantFeatureFlags } from "@/lib/feature-flags"
import { buildNavigation } from "@/lib/navigation"
import { TenantShell } from "./tenant-shell"
import { TenantProvider } from "./tenant-providers"

interface TenantLayoutProps {
  children: ReactNode
  params: { tenantId: string }
}

async function resolveBaseUrl() {
  const headerList = headers()
  const host = headerList.get("host")
  const protocol = headerList.get("x-forwarded-proto") ?? "http"
  if (host) {
    return `${protocol}://${host}`
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4200"
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenantId } = params
  const baseUrl = await resolveBaseUrl()
  const featureFlags = await getTenantFeatureFlags(tenantId, baseUrl)
  const navigation = buildNavigation(tenantId, featureFlags)

  return (
    <TenantProvider tenantId={tenantId}>
      <FeatureFlagsProvider featureFlags={featureFlags}>
        <TenantShell navigation={navigation}>{children}</TenantShell>
      </FeatureFlagsProvider>
    </TenantProvider>
  )
}
