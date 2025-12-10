"use client"

import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smallbiznis/ui/card"
import { useLicense, useTenantId } from "../tenant-providers"

// Tenant-scoped fallback when a feature is not on the current plan
export default function TenantLicenseError() {
  const tenantId = useTenantId()
  const license = useLicense()

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            License required
          </CardTitle>
          <CardDescription>
            {license.valid
              ? "This feature is not included in your current plan."
              : "Your license is missing or inactive."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4 flex-wrap text-sm text-muted-foreground">
          <div>
            <div className="font-semibold text-foreground">Tenant: {tenantId}</div>
            <div>Plan: {license.plan}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" asChild>
              <Link href={`/${tenantId}/settings`}>Manage plan</Link>
            </Button>
            <Button asChild>
              <Link href="mailto:admin@example.com?subject=License%20upgrade">Request upgrade</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
