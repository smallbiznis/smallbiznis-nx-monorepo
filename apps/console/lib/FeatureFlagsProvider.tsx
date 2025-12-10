"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { FeatureFlags } from "./feature-flags"

const FeatureFlagsContext = createContext<FeatureFlags | null>(null)

export function FeatureFlagsProvider({
  featureFlags,
  children,
}: {
  featureFlags: FeatureFlags
  children: ReactNode
}) {
  const value = useMemo(() => featureFlags, [featureFlags])
  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>
}

export function useFeatureFlags() {
  const value = useContext(FeatureFlagsContext)
  if (!value) {
    throw new Error("FeatureFlagsContext unavailable")
  }
  return value
}
