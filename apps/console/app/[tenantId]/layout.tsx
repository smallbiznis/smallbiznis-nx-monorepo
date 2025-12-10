'use client'

import React, { useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Repeat,
  FileText,
  TrendingUp,
  Settings,
  Package,
  Gauge,
  Building2,
  ChevronDown,
  ExternalLink,
  MoreVertical,
  Plus,
  Check
} from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@smallbiznis/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@smallbiznis/ui/avatar"
import { cn } from "@smallbiznis/ui/utils"

const organizations = [
  { id: "acme-corp", name: "Acme Corp", role: "Owner" },
  { id: "beta-labs", name: "Beta Labs", role: "Admin" },
  { id: "gamma-tech", name: "Gamma Tech", role: "Viewer" }
]

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Meters", href: "/meters", icon: Gauge },
  { name: "Subscriptions", href: "/subscriptions", icon: Repeat },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Usage", href: "/usage", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings }
]

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { tenantId } = useParams()
  const pathname = usePathname()
  const [activeOrg, setActiveOrg] = useState("acme-corp")
  const [showOrgSwitcher, setShowOrgSwitcher] = useState(false)

  const currentOrg = organizations.find(org => org.id === activeOrg)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shadow-sm">
        <div className="p-4 flex-1 flex flex-col">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 mb-6 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stripe-500 to-stripe-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-base font-bold tracking-tight">Acme Billing</div>
              <div className="text-xs text-muted-foreground">Revenue Platform</div>
            </div>
          </Link>

          {/* Organization Switcher */}
          <div className="mb-4 relative">
            <DropdownMenu open={showOrgSwitcher} onOpenChange={setShowOrgSwitcher}>
              <DropdownMenuTrigger asChild>
                <button className="w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-left flex items-center justify-between group">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{currentOrg?.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{currentOrg?.role}</div>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    showOrgSwitcher && "rotate-180"
                  )} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[calc(16rem-2rem)]" align="start">
                <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => setActiveOrg(org.id)}
                    className="gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{org.name}</div>
                      <div className="text-xs text-muted-foreground">{org.role}</div>
                    </div>
                    {activeOrg === org.id && <Check className="w-4 h-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add organization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navigation */}
          <nav className="space-y-0.5 flex-1">
            {navigation.map((item) => {
              const href = `/${tenantId}${item.href}`
              const isActive = pathname === href
              return (
                <Link
                  key={item.name}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Help Section */}
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold mb-0.5">Documentation</div>
                <div className="text-xs text-muted-foreground">Learn about our APIs</div>
              </div>
            </div>
            <button className="w-full text-xs text-primary hover:underline font-medium text-left">
              View docs →
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-border bg-muted/30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 px-2 py-1.5 w-full hover:bg-muted rounded-lg transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-stripe-500 to-stripe-600 text-white font-semibold text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-medium text-sm truncate">John Doe</div>
                  <div className="text-xs text-muted-foreground truncate">john@acme.com</div>
                </div>
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}