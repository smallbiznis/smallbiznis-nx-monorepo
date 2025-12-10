"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Icons from "lucide-react"
import { Building2, Check, ChevronDown, ExternalLink, MoreVertical, Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Avatar, AvatarFallback } from "@smallbiznis/ui/avatar"
import { Button } from "@smallbiznis/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@smallbiznis/ui/dropdown-menu"
import { Separator } from "@smallbiznis/ui/separator"
import { cn } from "@smallbiznis/ui/utils"
import type { NavigationItem } from "@/lib/navigation"
import { useLicense } from "@/lib/LicenseProvider"
import { useTenantId } from "./tenant-providers"

interface TenantShellProps {
  navigation: NavigationItem[]
  children: React.ReactNode
}

const organizations = [
  { id: "acme", name: "Acme Corp", role: "Owner" },
  { id: "beta", name: "Beta Labs", role: "Admin" },
]

export function TenantShell({ navigation, children }: TenantShellProps) {
  const pathname = usePathname()
  const tenantId = useTenantId()
  const license = useLicense()

  const activeOrg = organizations[0]

  const navigationWithActiveState = useMemo(
    () =>
      navigation.map((item) => ({
        ...item,
        icon: Icons[item.icon],
        isActive: pathname === item.href,
      })),
    [navigation, pathname],
  )

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <aside className="w-64 border-r border-border bg-card flex flex-col shadow-sm">
        <div className="p-4 flex-1 flex flex-col gap-6">
          <Link href={`/app/${tenantId}/dashboard`} className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">SB</span>
            </div>
            <div>
              <div className="text-base font-bold tracking-tight">SmallBiznis</div>
              <div className="text-xs text-muted-foreground">Tenant console</div>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between" aria-label="Switch organization">
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {activeOrg.name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full" align="start">
              <DropdownMenuLabel>Switch organization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {organizations.map((org) => (
                <DropdownMenuItem key={org.id} className="gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="flex-1">{org.name}</span>
                  {org.id === activeOrg.id && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Plus className="w-4 h-4" />
                Add organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="space-y-1">
            {navigationWithActiveState.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  item.isActive
                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.name}</span>
                <AnimatePresence initial={false}>
                  {item.isActive && (
                    <motion.div
                      className="h-2 w-2 rounded-full bg-primary-foreground"
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold mb-0.5">Documentation</div>
                <div className="text-xs text-muted-foreground">Learn about our APIs</div>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto text-xs" asChild>
              <Link href="https://docs.example.com" target="_blank" rel="noreferrer">
                View docs →
              </Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Edition: <span className="font-semibold text-foreground capitalize">{license.edition}</span>
          </div>
        </div>

        <div className="p-3 border-t border-border bg-muted/30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 px-2 py-1.5 w-full hover:bg-muted rounded-lg transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm">
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
              <DropdownMenuItem className="text-destructive focus:text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-[1600px] mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tenant</p>
              <h1 className="text-2xl font-semibold tracking-tight">{tenantId}</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full border px-3 py-1">{license.edition} edition</span>
              <Separator orientation="vertical" className="h-6" />
              <span className="rounded-full border px-3 py-1">License valid</span>
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  )
}
