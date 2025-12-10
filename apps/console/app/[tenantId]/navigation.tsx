import { FileText, Gauge, LayoutDashboard, Repeat, Settings, TrendingUp, Users } from "lucide-react"
import type { License } from "@/lib/license"

// Central navigation map that can be feature-filtered by license

export type NavigationItem = {
  name: string
  href: string
  icon: typeof LayoutDashboard
  featureKey?: string
}

const baseNavigation: Omit<NavigationItem, "href"> & { path: string }[] = [
  { name: "Overview", path: "dashboard", icon: LayoutDashboard },
  { name: "Customers", path: "customers", icon: Users },
  { name: "Subscriptions", path: "subscriptions", icon: Repeat, featureKey: "subscription" },
  { name: "Meters", path: "meters", icon: Gauge, featureKey: "meter" },
  { name: "Invoices", path: "invoices", icon: FileText },
  { name: "Usage", path: "usage", icon: TrendingUp, featureKey: "usage" },
  { name: "Settings", path: "settings", icon: Settings },
]

export function buildNavigation(tenantId: string, license: License | null): NavigationItem[] {
  return baseNavigation
    .filter((item) => !item.featureKey || license?.features?.[item.featureKey])
    .map((item) => ({ ...item, href: `/${tenantId}/${item.path}` }))
}
