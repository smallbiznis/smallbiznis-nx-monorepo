import Link from 'next/link';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Progress } from '@smallbiznis/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@smallbiznis/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { Textarea } from '@smallbiznis/ui/textarea';
import SubscriptionCard from './subscription-card';
import { ArrowUpRight, CalendarClock, Filter, Plus, RefreshCcw, Search } from 'lucide-react';

const subscriptions = [
  {
    id: 'sub_001',
    customer: 'Nova Biosystems',
    plan: 'Usage API - Pro',
    status: 'Active',
    term: 'Annual',
    renewal: 'Dec 1, 2024',
    mrr: '$42,800',
    usage: 82,
  },
  {
    id: 'sub_002',
    customer: 'Reflect Labs',
    plan: 'Growth Plan',
    status: 'Trialing',
    term: 'Quarterly',
    renewal: 'Jul 2, 2024',
    mrr: '$6,200',
    usage: 24,
  },
  {
    id: 'sub_003',
    customer: 'Helix Security',
    plan: 'Enterprise Flat + Overages',
    status: 'At risk',
    term: 'Monthly',
    renewal: 'Jun 28, 2024',
    mrr: '$18,450',
    usage: 96,
  },
  {
    id: 'sub_004',
    customer: 'Southport Analytics',
    plan: 'Startup',
    status: 'Paused',
    term: 'Monthly',
    renewal: '—',
    mrr: '$1,280',
    usage: 0,
  },
];

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Monetize & retain tenants</p>
          <h1 className="text-2xl font-semibold">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage recurring plans, renewal health, and lifecycle events across all customers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New subscription
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Active', value: '128' }, { label: 'Trialing', value: '12' }, { label: 'At risk', value: '6' }, { label: 'Paused', value: '5' }].map(
          (stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <CardTitle className="text-sm">{stat.label}</CardTitle>
                <CardDescription>Subscription posture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <Tabs defaultValue="roster" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="roster" className="space-y-4">
          <Card>
            <CardHeader className="gap-4 space-y-0 md:flex md:items-center md:justify-between">
              <div>
                <CardTitle className="text-lg">Subscription roster</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Monitor status, utilization, and next renewal dates for every subscription.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="space-y-1">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="status" className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trialing">Trialing</SelectItem>
                      <SelectItem value="at_risk">At risk</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="search" placeholder="Find by customer, plan, or ID" className="w-[260px] pl-9" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead className="text-right">MRR</TableHead>
                      <TableHead className="text-right">Renewal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id} className="hover:bg-muted/50">
                        <TableCell className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Link href={`/subscriptions/${subscription.id}`} className="font-semibold hover:underline">
                              {subscription.customer}
                            </Link>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">{subscription.id}</p>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{subscription.plan}</TableCell>
                        <TableCell>
                          <Badge
                            variant={subscription.status === 'At risk' ? 'destructive' : subscription.status === 'Paused' ? 'outline' : 'secondary'}
                          >
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{subscription.term}</TableCell>
                        <TableCell className="text-right font-semibold">{subscription.mrr}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{subscription.renewal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>Showing {subscriptions.length} subscriptions</span>
                <Badge variant="outline" className="rounded-full">Auto collection</Badge>
                <Badge variant="secondary" className="rounded-full">Usage metered</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals" className="grid gap-4 lg:grid-cols-3">
          <SubscriptionCard
            title="Renewals this month"
            description="Ready to invoice and confirm term changes"
            actions={<Button size="sm" variant="outline">Export</Button>}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Nova Biosystems</p>
                      <p className="text-xs text-muted-foreground">Usage API - Pro · Annual</p>
                    </div>
                    <Badge variant="secondary">Dec 1</Badge>
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Projected</p>
                      <p className="font-semibold">$42,800</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Owner</p>
                      <p className="text-sm text-muted-foreground">Revenue ops</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Collection</p>
                      <p className="text-sm text-muted-foreground">Auto + ACH</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SubscriptionCard>
          <SubscriptionCard
            title="At-risk renewals"
            description="High utilization or billing blockers"
            actions={<Button size="sm" variant="destructive" className="gap-2"><CalendarClock className="h-4 w-4" /> Escalate</Button>}
          >
            <div className="space-y-3">
              {subscriptions
                .filter((sub) => sub.status === 'At risk')
                .map((sub) => (
                  <div key={sub.id} className="space-y-2 rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">{sub.customer}</p>
                        <p className="text-xs text-muted-foreground">{sub.plan}</p>
                      </div>
                      <Badge variant="destructive">At risk</Badge>
                    </div>
                    <Progress value={sub.usage} />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Usage at {sub.usage}% of included volume</span>
                      <span>Renews {sub.renewal}</span>
                    </div>
                  </div>
                ))}
            </div>
          </SubscriptionCard>
        </TabsContent>

        <TabsContent value="actions" className="grid gap-4 lg:grid-cols-3">
          <SubscriptionCard
            title="Manual actions"
            description="Document out-of-band updates or approvals"
            actions={<Button size="sm" variant="outline" className="gap-2"><RefreshCcw className="h-4 w-4" /> Sync CRM</Button>}
            className="lg:col-span-2"
          >
            <div className="space-y-3">
              <Textarea placeholder="Log plan changes, approvals, or customer requests" />
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="rounded-full">Discounts</Badge>
                <Badge variant="outline" className="rounded-full">Payment method</Badge>
                <Badge variant="outline" className="rounded-full">Seat changes</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">Save note</Button>
                <Button size="sm" variant="ghost">Attach file</Button>
              </div>
            </div>
          </SubscriptionCard>
          <SubscriptionCard title="Upcoming invoices" description="Preview drafts from usage + flat fees">
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Helix Security</span>
                <span className="font-semibold text-foreground">$18,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reflect Labs</span>
                <span className="font-semibold text-foreground">$6,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Southport Analytics</span>
                <span className="font-semibold text-foreground">$1,280</span>
              </div>
            </div>
          </SubscriptionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
