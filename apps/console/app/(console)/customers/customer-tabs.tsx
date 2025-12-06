'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@smallbiznis/ui/tabs';
import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Separator } from '@smallbiznis/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { AlertCircle, Mail, MapPin, Smartphone } from 'lucide-react';

type Customer = {
  id: string;
  name: string;
  email: string;
  status: string;
  plan: string;
  mrr: string;
  timezone: string;
  phone?: string;
  address?: string;
};

const invoices = [
  { id: '#INV-14410', amount: '$12,480', status: 'Paid', date: 'Jun 18' },
  { id: '#INV-14398', amount: '$7,120', status: 'Paid', date: 'Jun 17' },
  { id: '#INV-14382', amount: '$3,860', status: 'Open', date: 'Jun 16' },
];

const usage = [
  { label: 'Events ingested (30d)', value: '12.4M', trend: '+4.2% MoM' },
  { label: 'Overage threshold', value: '82% of limit', trend: 'Warn at 90%' },
  { label: 'Last meter event', value: '32 seconds ago', trend: 'collector-us-east' },
];

export default function CustomerTabs({ customer }: { customer: Customer }) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 rounded-lg border p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {[{ label: 'Plan', value: customer.plan }, { label: 'MRR', value: customer.mrr }, { label: 'Timezone', value: customer.timezone }].map(
            (item) => (
              <div key={item.label} className="rounded-md border bg-card p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
                <p className="text-base font-semibold">{item.value}</p>
              </div>
            ),
          )}
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{customer.email}</p>
                  <p className="text-muted-foreground">Billing & notifications</p>
                </div>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{customer.phone}</p>
                    <p className="text-muted-foreground">SMS receipts</p>
                  </div>
                </div>
              )}
              {customer.address && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Billing address</p>
                    <p className="text-muted-foreground">{customer.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Risk & collections</CardTitle>
                <p className="text-sm text-muted-foreground">Delinquency and dunning posture</p>
              </div>
              <Badge variant="secondary">{customer.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-md border border-dashed bg-muted/30 px-3 py-2 text-sm">
                <p className="font-medium text-foreground">Auto-collection</p>
                <p className="text-muted-foreground">Enabled via ACH & card fallback</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Retry rules: progressive, max 5 attempts, then pause.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="default">
                  Adjust dunning
                </Button>
                <Button size="sm" variant="outline">
                  Issue credit note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="billing">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent invoices</CardTitle>
              <p className="text-sm text-muted-foreground">Issued and open invoices for this customer</p>
            </div>
            <Button size="sm" variant="outline">
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Issued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'Open' ? 'secondary' : 'outline'}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{invoice.amount}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{invoice.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="usage" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Usage signals</CardTitle>
            <p className="text-sm text-muted-foreground">Ingestion and entitlement health for the tenant</p>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {usage.map((item) => (
              <div key={item.label} className="rounded-lg border bg-card p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.trend}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Collectors</CardTitle>
              <p className="text-sm text-muted-foreground">Event pipelines feeding this customer</p>
            </div>
            <Badge variant="secondary">Healthy</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {["collector-us-east", "collector-eu-west"].map((collector) => (
              <div key={collector} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">{collector}</p>
                  <p className="text-muted-foreground">Lag &lt; 2m • At-least-once</p>
                </div>
                <Badge variant="outline">Live</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activity">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <p className="text-sm text-muted-foreground">Lifecycle events and operator actions</p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { title: 'Subscription upgraded to Enterprise Usage', date: 'Today · 9:24 AM' },
              { title: 'Invoice #INV-14382 sent to billing@novabio.com', date: 'Yesterday · 4:18 PM' },
              { title: 'Usage threshold alert triggered at 80%', date: 'Jun 17 · 11:02 AM' },
              { title: 'Payment method updated via customer portal', date: 'Jun 16 · 6:33 PM' },
            ].map((item) => (
              <div key={item.title} className="rounded-md border bg-muted/40 px-3 py-2">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-muted-foreground">{item.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
