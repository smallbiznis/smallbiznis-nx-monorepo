import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

import { getGlobalLicense } from "@/lib/license"
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
  const license = await getGlobalLicense(baseUrl)

  if (!license.valid) {
    redirect("/license/error")
  }

  const navigation = buildNavigation(tenantId, license)

  return (
    <TenantProvider tenantId={tenantId}>
      <TenantShell navigation={navigation}>{children}</TenantShell>
    </TenantProvider>
  )
}
