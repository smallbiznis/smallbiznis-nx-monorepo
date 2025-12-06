'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@smallbiznis/ui/sidebar';
import { Badge } from '@smallbiznis/ui/badge';
import { Separator } from '@smallbiznis/ui/separator';
import {
  Activity,
  BadgeDollarSign,
  Cable,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Package,
  ReceiptText,
  Repeat,
  Settings2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pricing', label: 'Plans & Pricing', icon: BadgeDollarSign },
  { href: '/products', label: 'Products & Meters', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/subscriptions', label: 'Subscriptions', icon: Repeat },
  { href: '/usage', label: 'Usage', icon: Activity },
  { href: '/invoices', label: 'Invoices', icon: ReceiptText },
  { href: '/billing-profile', label: 'Billing Profile', icon: CreditCard },
  { href: '/api-keys', label: 'API Keys', icon: KeyRound },
  { href: '/webhooks', label: 'Webhooks', icon: Cable },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between gap-2 px-3 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Billing Console
          </p>
          <p className="text-sm font-medium text-foreground">Tenant operations</p>
        </div>
        <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px]">
          v1.0
        </Badge>
      </SidebarHeader>
      <Separator className="mx-3" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
                  <Link href={href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-4 text-xs text-muted-foreground">
        <div className="flex items-center justify-between rounded-md border border-dashed px-3 py-2 text-muted-foreground">
          <div>
            <p className="text-xs font-medium text-foreground">Tenant context</p>
            <p className="text-[11px]">Switch tenants in the top bar</p>
          </div>
          <SidebarMenuBadge className="bg-primary/10 text-xs font-semibold text-primary">Live</SidebarMenuBadge>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export { SidebarInset };
