"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"

const TenantContext = createContext<string | null>(null)

export function TenantProvider({ tenantId, children }: { tenantId: string; children: ReactNode }) {
  const tenantValue = useMemo(() => tenantId, [tenantId])

  return <TenantContext.Provider value={tenantValue}>{children}</TenantContext.Provider>
}

export function useTenantId() {
  const value = useContext(TenantContext)
  if (!value) {
    throw new Error("TenantContext unavailable")
  }
  return value
}
