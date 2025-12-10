import Link from "next/link"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { Button } from "@smallbiznis/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smallbiznis/ui/card"

// Shared error surface used when middleware blocks invalid licenses

export default function LicenseErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="max-w-lg w-full border-destructive/30">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <CardTitle>License issue detected</CardTitle>
          <CardDescription>
            Your current tenant license is missing, expired, or does not include the requested feature.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground text-center">
          <p>Please contact your organization administrator to refresh or upgrade the license.</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to home
              </Link>
            </Button>
            <Button asChild>
              <Link href="mailto:admin@example.com?subject=License%20help">Contact support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
