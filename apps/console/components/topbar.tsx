'use client';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@smallbiznis/ui/dropdown-menu';
import { Input } from '@smallbiznis/ui/input';
import { Separator } from '@smallbiznis/ui/separator';
import { SidebarTrigger } from '@smallbiznis/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@smallbiznis/ui/avatar';
import { Bell, ChevronsUpDown, CircleUser } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background/80 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <Separator orientation="vertical" className="hidden h-6 md:flex" />
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full border-dashed px-3 text-sm"
        >
          <span className="font-medium">Tenant</span>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
        <Badge variant="secondary" className="rounded-full px-2 py-1 text-xs">
          Sandbox
        </Badge>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden w-full max-w-md items-center gap-2 rounded-full border bg-muted/40 px-4 py-1 text-sm text-muted-foreground md:flex">
          <Input
            placeholder="Search customers, invoices, subscriptions"
            className="h-9 w-full border-none bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage alt="User avatar" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div className="hidden text-left text-sm leading-tight md:block">
                <p className="font-medium text-foreground">Sam Billing</p>
                <p className="text-xs text-muted-foreground">Owner</p>
              </div>
              <CircleUser className="hidden h-4 w-4 text-muted-foreground md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Organization</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
