"use client"

// Shared tenant + license context providers so server and client components can agree on state

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react"
import { createStore, useStore, type StoreApi } from "zustand"
import type { License } from "@/lib/license"

interface TenantState {
  tenantId: string
  license: License
}

const TenantContext = createContext<string | null>(null)
const LicenseContext = createContext<License | null>(null)
const TenantStoreContext = createContext<StoreApi<TenantState> | null>(null)

function createTenantStore(initialState: TenantState) {
  return createStore<TenantState>(() => initialState)
}

export function TenantProvider({ tenantId, license, children }: {
  tenantId: string
  license: License
  children: ReactNode
}) {
  const storeRef = useRef<StoreApi<TenantState>>()

  if (!storeRef.current) {
    storeRef.current = createTenantStore({ tenantId, license })
  }

  const tenantValue = useMemo(() => tenantId, [tenantId])
  const licenseValue = useMemo(() => license, [license])

  return (
    <TenantStoreContext.Provider value={storeRef.current}>
      <TenantContext.Provider value={tenantValue}>
        <LicenseContext.Provider value={licenseValue}>{children}</LicenseContext.Provider>
      </TenantContext.Provider>
    </TenantStoreContext.Provider>
  )
}

export function useTenantId() {
  const value = useContext(TenantContext)
  if (!value) {
    throw new Error("TenantContext unavailable")
  }
  return value
}

export function useLicense() {
  const value = useContext(LicenseContext)
  if (!value) {
    throw new Error("LicenseContext unavailable")
  }
  return value
}

export function useTenantStore<T>(selector: (state: TenantState) => T) {
  const store = useContext(TenantStoreContext)
  if (!store) {
    throw new Error("TenantStoreContext unavailable")
  }
  return useStore(store, selector)
}
