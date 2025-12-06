import Link from 'next/link';

import SubscriptionCard from '../subscription-card';
import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Progress } from '@smallbiznis/ui/progress';
import { Separator } from '@smallbiznis/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { Textarea } from '@smallbiznis/ui/textarea';
import { ArrowLeft, ArrowUpRight, Calendar, CreditCard, Pause, Play, ShieldCheck } from 'lucide-react';

const subscription = {
  id: 'sub_001',
  customer: 'Nova Biosystems',
  plan: 'Usage API - Pro',
  status: 'Active',
  term: 'Annual',
  renewal: 'Dec 1, 2024',
  start: 'Dec 1, 2023',
  mrr: '$42,800',
  collection: 'Auto (ACH + card)',
  usage: 82,
  invoiceDay: '1st of month',
};

export default function SubscriptionDetailPage({ params }: { params: { subscriptionId: string } }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/subscriptions" className="inline-flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Subscriptions
          </Link>
          <ArrowUpRight className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">{params.subscriptionId}</span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Subscription</p>
            <h1 className="text-2xl font-semibold leading-tight">{subscription.customer}</h1>
            <p className="text-sm text-muted-foreground">{subscription.plan}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{subscription.status}</Badge>
            <Badge variant="outline" className="rounded-full">
              Term {subscription.term}
            </Badge>
            <Button variant="outline" className="gap-2">
              <Pause className="h-4 w-4" /> Pause
            </Button>
            <Button className="gap-2">
              <CreditCard className="h-4 w-4" /> Issue credit
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'MRR', value: subscription.mrr }, { label: 'Renewal', value: subscription.renewal }, { label: 'Collection', value: subscription.collection }, { label: 'Usage', value: `${subscription.usage}% of allocation` }].map(
          (stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <CardTitle className="text-sm">{stat.label}</CardTitle>
                <CardDescription>Current</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid gap-4 lg:grid-cols-3">
          <SubscriptionCard
            title="Lifecycle"
            description="Start date, renewal, and collection preferences"
            actions={<Badge variant="outline" className="rounded-full">Live</Badge>}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Start</p>
                <p className="font-semibold text-foreground">{subscription.start}</p>
                <p className="text-xs text-muted-foreground">Annual term | {subscription.invoiceDay}</p>
              </div>
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Renewal</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-semibold text-foreground">{subscription.renewal}</p>
                </div>
                <p className="text-xs text-muted-foreground">Notify account owner 30 days prior</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Collection</p>
                <p className="text-sm text-muted-foreground">{subscription.collection}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Payment method</p>
                <p className="text-sm text-muted-foreground">ACH primary, card backup</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Invoice cadence</p>
                <p className="text-sm text-muted-foreground">Monthly usage aggregation</p>
              </div>
            </div>
          </SubscriptionCard>

          <SubscriptionCard
            title="Line items"
            description="Recurring, usage, and add-on amounts"
            actions={<Button size="sm" variant="outline">Edit items</Button>}
            className="lg:col-span-2"
          >
            <div className="overflow-x-auto rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="space-y-1">
                      <p className="font-semibold text-foreground">Usage API - Pro</p>
                      <p className="text-xs text-muted-foreground">Metered · event volume</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">Tiered usage</TableCell>
                    <TableCell className="text-sm text-muted-foreground">Meter-driven</TableCell>
                    <TableCell className="text-right font-semibold">$36,800</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="space-y-1">
                      <p className="font-semibold text-foreground">Seats</p>
                      <p className="text-xs text-muted-foreground">145 provisioned</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">Per seat</TableCell>
                    <TableCell className="text-sm text-muted-foreground">145</TableCell>
                    <TableCell className="text-right font-semibold">$4,350</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="space-y-1">
                      <p className="font-semibold text-foreground">Onboarding package</p>
                      <p className="text-xs text-muted-foreground">Professional services</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">One-time</TableCell>
                    <TableCell className="text-sm text-muted-foreground">1</TableCell>
                    <TableCell className="text-right font-semibold">$1,650</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
              <span>Prorations enabled · Tax inclusive</span>
              <span className="font-semibold text-foreground">Projected invoice: $42,800</span>
            </div>
          </SubscriptionCard>
        </TabsContent>

        <TabsContent value="usage" className="grid gap-4 lg:grid-cols-3">
          <SubscriptionCard
            title="Usage health"
            description="Included allocation vs. actuals"
            actions={<Badge variant="outline" className="rounded-full">Metered</Badge>}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Event volume</span>
                  <span>{subscription.usage}%</span>
                </div>
                <Progress value={subscription.usage} />
                <p className="text-xs text-muted-foreground">Included: 1.2B events · Overages after 100%</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1 rounded-lg border p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Alerts</p>
                  <p className="text-sm text-muted-foreground">Threshold set at 90%</p>
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Overages</p>
                  <p className="text-sm text-muted-foreground">$0.12 / 10k events</p>
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Sync</p>
                  <p className="text-sm text-muted-foreground">Webhook + daily CSV</p>
                </div>
              </div>
            </div>
          </SubscriptionCard>

          <SubscriptionCard
            title="Lifecycle controls"
            description="Pause, resume, and enforce entitlements"
            actions={<Button size="sm" variant="outline" className="gap-2"><Play className="h-4 w-4" /> Resume</Button>}
          >
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-foreground" />
                <span>Entitlements synced to product gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-foreground" />
                <span>Payment method verified · ACH default</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-foreground" />
                <span>Next invoice drafts on the 1st</span>
              </div>
            </div>
          </SubscriptionCard>

          <SubscriptionCard title="Notes" description="Document changes or approvals">
            <div className="space-y-3">
              <Textarea placeholder="Add renewal notes, discounts, or approvals" />
              <div className="flex items-center gap-2">
                <Button size="sm">Save note</Button>
                <Button size="sm" variant="ghost">
                  Attach file
                </Button>
              </div>
            </div>
          </SubscriptionCard>
        </TabsContent>

        <TabsContent value="timeline">
          <SubscriptionCard
            title="Activity log"
            description="Recent events for this subscription"
            actions={<Button size="sm" variant="outline">Export CSV</Button>}
          >
            <div className="space-y-4">
              {[
                {
                  title: 'Usage threshold reached',
                  detail: 'Triggered at 80% of allocation · alerts sent to revops',
                  time: 'Today · 9:40 AM',
                },
                {
                  title: 'Payment method added',
                  detail: 'ACH account ending in 9932 verified',
                  time: 'Yesterday · 3:12 PM',
                },
                {
                  title: 'Plan upgraded',
                  detail: 'Moved from Growth to Usage API - Pro',
                  time: 'Jun 1 · 1:04 PM',
                },
              ].map((event) => (
                <div key={event.title} className="space-y-1 rounded-lg border p-3">
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.detail}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              ))}
            </div>
          </SubscriptionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
