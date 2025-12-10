"use client"

import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smallbiznis/ui/card"
import { useLicense } from "@/lib/LicenseProvider"
import { useTenantId } from "../tenant-providers"

export default function TenantLicenseError() {
  const tenantId = useTenantId()
  const license = useLicense()

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            Feature not available
          </CardTitle>
          <CardDescription>
            {license.valid
              ? "This deployment license does not include the requested feature."
              : "The deployment license is inactive or expired."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4 flex-wrap text-sm text-muted-foreground">
          <div>
            <div className="font-semibold text-foreground">Tenant: {tenantId}</div>
            <div>Edition: {license.edition}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" asChild>
              <Link href={`/app/${tenantId}/settings`}>View settings</Link>
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
