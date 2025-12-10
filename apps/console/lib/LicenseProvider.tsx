"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { License } from "./license"

const LicenseContext = createContext<License | null>(null)

export function LicenseProvider({ license, children }: { license: License; children: ReactNode }) {
  const value = useMemo(() => license, [license])
  return <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
}

export function useLicense() {
  const value = useContext(LicenseContext)
  if (!value) {
    throw new Error("LicenseContext unavailable")
  }
  return value
}
