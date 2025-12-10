import { headers } from "next/headers"
import { redirect, useParams } from "next/navigation"
import type { ReactNode } from "react"
import { fetchTenantLicense } from "@/lib/license"
import { buildNavigation } from "./navigation"
import { TenantShell } from "./tenant-shell"
import { TenantProvider } from "./tenant-providers"

interface TenantLayoutProps {
  children: ReactNode
  params: { tenantId: string }
}

// Server layout loads license and wraps tenant shell UI
export default async function TenantLayout({ children, params }: TenantLayoutProps) {

  const { tenantId } = await params
  const headerList = await headers()
  const host = headerList.get("host")
  const protocol = headerList.get("x-forwarded-proto") ?? "http"
  const license = await fetchTenantLicense(tenantId, host ? `${protocol}://${host}` : undefined)

  if (!license?.valid) {
    redirect("/license/error")
  }

  const navigation = buildNavigation(tenantId, license)

  return (
    <TenantProvider tenantId={tenantId} license={license}>
      <TenantShell navigation={navigation}>{children}</TenantShell>
    </TenantProvider>
  )
}
