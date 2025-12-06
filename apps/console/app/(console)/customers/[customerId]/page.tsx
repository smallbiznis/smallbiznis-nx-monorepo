import CustomerTabs from '../customer-tabs';
import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Separator } from '@smallbiznis/ui/separator';
import { Avatar, AvatarFallback } from '@smallbiznis/ui/avatar';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const customer = {
  id: 'cus_001',
  name: 'Nova Biosystems',
  email: 'billing@novabio.com',
  status: 'Active',
  plan: 'Enterprise Usage',
  mrr: '$42,800',
  timezone: 'ET (UTC-5)',
  phone: '+1 (917) 555-2283',
  address: '441 9th Avenue, New York, NY 10001',
};

export default function CustomerDetailPage({ params }: { params: { customerId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/customers" className="inline-flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Customers
          </Link>
          <ArrowUpRight className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
            {params.customerId}
          </span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Tenant customer</p>
              <h1 className="text-2xl font-semibold leading-tight">{customer.name}</h1>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{customer.status}</Badge>
            <Badge variant="outline" className="rounded-full">{customer.plan}</Badge>
            <Button>Issue adjustment</Button>
            <Button variant="outline">Update plan</Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Account snapshot</CardTitle>
            <p className="text-sm text-muted-foreground">Latest billing posture and entitlement health</p>
          </div>
          <Badge variant="secondary">Live</Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'MRR', value: customer.mrr },
            { label: 'Plan', value: customer.plan },
            { label: 'Timezone', value: customer.timezone },
            { label: 'Collection status', value: 'Auto' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-3">
              <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation notes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Confirm ingestion paths, API keys, and entitlement assignments for this tenant.
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Ingestion via collector-us-east primary, eu-west secondary.</p>
          <p>• Using per-event usage model with tiered overages; webhook delivery via HTTPS.</p>
          <p>• Sandbox tenant maps to prefix nova-sbx-*; prod keys rotated last week.</p>
        </CardContent>
      </Card>

      <Separator />

      <CustomerTabs customer={customer} />
    </div>
  );
}
