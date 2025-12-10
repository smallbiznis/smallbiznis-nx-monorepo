import type { FeatureFlags } from "./feature-flags"

export type NavigationItem = {
  name: string
  href: string
  icon: string
  flag?: string
}

const baseNavigation: (Omit<NavigationItem, "href"> & { path: string })[] = [
  { name: "Overview", path: "dashboard", icon: "LayoutDashboard" },
  { name: "Customers", path: "customers", icon: "Users", flag: "customers" },
  { name: "Subscriptions", path: "subscriptions", icon: "Repeat", flag: "subscriptions" },
  { name: "Meters", path: "meters", icon: "Gauge", flag: "meter" },
  { name: "Invoices", path: "invoices", icon: "FileText" },
  { name: "Usage", path: "usage", icon: "TrendingUp", flag: "usage" },
  { name: "Settings", path: "settings", icon: "Settings" },
]

export function buildNavigation(tenantId: string, featureFlags: FeatureFlags): NavigationItem[] {
  return baseNavigation
    .filter((item) => !item.flag || featureFlags[item.flag])
    .map((item) => ({ ...item, href: `/app/${tenantId}/${item.path}` }))
}
