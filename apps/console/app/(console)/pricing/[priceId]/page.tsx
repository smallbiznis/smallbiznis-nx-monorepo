import TierEditor from '../tier-editor';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Separator } from '@smallbiznis/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { Info, MoveLeft } from 'lucide-react';
import Link from 'next/link';

const catalog = {
  'price-pro-usage': {
    name: 'Usage API - Pro',
    interval: 'Monthly',
    currency: 'USD',
    amount: '$0.12 + tiers',
    billingModel: 'Tiered',
    meter: 'Event volume',
    status: 'Active',
    product: 'Usage API',
    description: 'Advanced usage-based pricing for production tenants.',
  },
  'price-seat-annual': {
    name: 'Seat-based - Annual',
    interval: 'Yearly',
    currency: 'USD',
    amount: '$199.00',
    billingModel: 'Flat',
    meter: 'Seats',
    status: 'Active',
    product: 'Seat-based billing',
    description: 'Annual commitment with per-seat allocation and overage.',
  },
};

export default function PriceDetailPage({ params }: { params: { priceId: string } }) {
  const price = catalog[params.priceId as keyof typeof catalog] ?? catalog['price-pro-usage'];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Price detail</p>
          <h1 className="text-2xl font-semibold">{price.name}</h1>
          <p className="text-muted-foreground">{price.description}</p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">{price.status}</Badge>
            <Badge variant="outline" className="rounded-full">{price.interval}</Badge>
            <Badge variant="outline" className="rounded-full">{price.currency}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/pricing">
              <MoveLeft className="h-4 w-4" />
              Back to pricing
            </Link>
          </Button>
          <Button>Edit price</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[420px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tiers">Tiers</TabsTrigger>
          <TabsTrigger value="usage">Usage guidance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing configuration</CardTitle>
              <CardDescription>Key attributes that define this price.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {[{ label: 'Product', value: price.product }, { label: 'Billing model', value: price.billingModel }, { label: 'Interval', value: price.interval }, { label: 'Currency', value: price.currency }, { label: 'Amount', value: price.amount }, { label: 'Meter', value: price.meter }].map(
                (item) => (
                  <div key={item.label} className="space-y-1 rounded-lg border bg-muted/40 p-3">
                    <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ),
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Entitlements</CardTitle>
              <CardDescription>Capabilities unlocked when this price is attached.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {["Enhanced rate limits", "Priority webhook delivery", "Audit log retention", "Real-time usage exports"].map((item) => (
                <div key={item} className="rounded-lg border bg-background px-3 py-2 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <TierEditor meterName={price.meter} />
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Implementation notes</CardTitle>
              <CardDescription>Ensure events align to this price before enabling subscriptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Validate that metered events are emitted with the correct meter name (<span className="font-semibold text-foreground">{price.meter}</span>)
                and include tenant identifiers for attribution.
              </p>
              <p>Use preview mode in the Usage section to confirm ingestion before moving customers.</p>
              <div className="flex items-start gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                <Info className="mt-[2px] h-4 w-4" />
                <span>
                  For existing subscriptions, create a new price version and migrate incrementally to preserve invoice continuity.
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Audit trail</CardTitle>
          <CardDescription>Creation and change events for this price.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>Version 1 issued by Sam Billing</span>
            <Badge variant="secondary" className="rounded-full">Published</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>Meter linked to <span className="font-medium text-foreground">{price.meter}</span></span>
            <Badge variant="outline" className="rounded-full">Metering</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
