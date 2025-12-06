import PriceTable, { Price } from './price-table';
import CreatePriceWizard from './create-price-wizard';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Separator } from '@smallbiznis/ui/separator';
import Link from 'next/link';

const prices: Price[] = [
  {
    id: 'price-pro-usage',
    name: 'Usage API - Pro',
    product: 'Usage API',
    interval: 'monthly',
    amount: '$0.12 + tiers',
    currency: 'usd',
    billingModel: 'tiered',
    status: 'active',
    meter: 'Event volume',
  },
  {
    id: 'price-seat-annual',
    name: 'Seat-based - Annual',
    product: 'Seat-based billing',
    interval: 'yearly',
    amount: '$199.00',
    currency: 'usd',
    billingModel: 'flat',
    status: 'active',
  },
  {
    id: 'price-implementation',
    name: 'Implementation package',
    product: 'Professional services',
    interval: 'one_time',
    amount: '$4,500.00',
    currency: 'usd',
    billingModel: 'per_unit',
    status: 'draft',
  },
  {
    id: 'price-legacy',
    name: 'Legacy standard',
    product: 'Usage API',
    interval: 'monthly',
    amount: '$0.18',
    currency: 'usd',
    billingModel: 'flat',
    status: 'archived',
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Monetize and package your catalog</p>
          <h1 className="text-2xl font-semibold">Plans & Pricing</h1>
          <p className="text-muted-foreground">
            Create and manage flat, usage-based, and hybrid prices that power subscriptions and invoicing.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">Catalog v2</Badge>
            <Badge variant="outline" className="rounded-full">Metered</Badge>
            <Badge variant="outline" className="rounded-full">Recurring</Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/products">Back to products</Link>
          </Button>
          <CreatePriceWizard />
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Active prices', value: '24' }, { label: 'Draft prices', value: '6' }, { label: 'Archived', value: '8' }].map(
          (stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <CardTitle className="text-sm">{stat.label}</CardTitle>
                <CardDescription>Current state of your catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          ),
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Entitlements</CardTitle>
            <CardDescription>Attach features to prices and plans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Use feature entitlements to unlock capabilities per price point and enforce within your app.</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/settings">Configure entitlements</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <PriceTable prices={prices} />
    </div>
  );
}
