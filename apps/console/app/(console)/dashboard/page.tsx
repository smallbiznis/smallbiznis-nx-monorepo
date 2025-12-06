'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import DashboardCard from '@/components/dashboard-card';
import { FeatureEnablementGuide } from '@/components/dashboard/feature-enablement-guide';
import { TenantSetupAssistant } from '@/components/dashboard/tenant-setup-assistant';
import { GettingStartedStripe } from '@/components/dashboard/getting-started-stripe';
import { Alert, AlertDescription, AlertTitle } from '@smallbiznis/ui/alert';
import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Separator } from '@smallbiznis/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { AlertTriangle, ArrowUpRight, BellRing, CheckCircle2, Info } from 'lucide-react';

const summaryCards = [
  {
    title: 'Monthly recurring revenue',
    value: '$482.4k',
    delta: '+12.4% MoM',
    badge: 'Growth',
  },
  {
    title: 'Active subscriptions',
    value: '1,284',
    delta: '+86 this week',
    badge: 'Live',
  },
  {
    title: 'Invoices collected',
    value: '94.6%',
    delta: '7 in retry',
    badge: 'Collections',
  },
  {
    title: 'Meter events (24h)',
    value: '1.2M',
    delta: '2.3% error rate',
    badge: 'Usage',
  },
];

const alerts = [
  {
    title: 'Invoice delivery delays detected',
    description: 'Webhook latency elevated in us-east-1. Affected tenants are queued for retries.',
    icon: AlertTriangle,
    variant: 'destructive' as const,
  },
  {
    title: 'Sandbox tenant nearing credit limit',
    description: 'Set a new spending limit or pause ingestion for tenant "atlas-sandbox".',
    icon: BellRing,
    variant: 'default' as const,
  },
  {
    title: 'Usage pipeline healthy',
    description: 'No ingestion gaps detected across primary and backup collectors.',
    icon: CheckCircle2,
    variant: 'default' as const,
  },
];

const invoices = [
  { id: '#INV-14410', customer: 'Nova Biosystems', status: 'Paid', amount: '$12,480', date: 'Jun 18' },
  { id: '#INV-14409', customer: 'Reflect Labs', status: 'Open', amount: '$3,280', date: 'Jun 18' },
  { id: '#INV-14398', customer: 'Helix Security', status: 'Paid', amount: '$7,120', date: 'Jun 17' },
  { id: '#INV-14396', customer: 'Southport Analytics', status: 'Retrying', amount: '$2,040', date: 'Jun 17' },
];

function useBillingProfile() {
  return useMemo(
    () => ({ status: 'verified', remittance: 'USD settlement', taxId: 'US-99821', contacts: 3 }),
    [],
  );
}

function useMeters() {
  return useMemo(
    () => ({ defined: 12, active: 10, quota: { limit: 5_000_000, used: 1_240_000 }, lagMs: 120 }),
    [],
  );
}

function useProducts() {
  return useMemo(() => ({ total: 8, published: 6, experiments: 2 }), []);
}

function usePrices() {
  return useMemo(() => ({ active: 18, models: ['flat', 'tiered', 'usage-based'] }), []);
}

function useSubscriptions() {
  return useMemo(() => ({ active: 1284, renewalsDue: 62, churnRisk: 14 }), []);
}

function useInvoices() {
  return useMemo(() => ({ open: 12, paid: 214, retrying: 4, totalAmount: '$248k' }), []);
}

function useUsageRecords() {
  return useMemo(() => ({ last24h: 1_200_000, anomalies: 2, ingestionLag: '2m 14s', apiActivity: '8.1k/min' }), []);
}

function useAPIKeys() {
  return useMemo(() => ({ active: 12, sandbox: 6, production: 6, lastRotated: '5 days ago' }), []);
}

function useWebhooks() {
  return useMemo(() => ({ healthy: 7, failing: 1, medianLatency: '380ms', retriesQueued: 12 }), []);
}

const totalSetupSteps = 9;

function EnterpriseInsights() {
  const billingProfile = useBillingProfile();
  const meters = useMeters();
  const products = useProducts();
  const prices = usePrices();
  const subscriptions = useSubscriptions();
  const invoiceSummary = useInvoices();
  const usageSummary = useUsageRecords();
  const apiKeys = useAPIKeys();
  const webhooks = useWebhooks();

  const quotaPercent = Math.round((meters.quota.used / meters.quota.limit) * 100);

  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <DashboardCard
        title="Quota Overview"
        description="GET /v1/quota"
        action={<Badge variant="outline">{quotaPercent}% used</Badge>}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Events processed</span>
            <span className="font-semibold text-foreground">{meters.quota.used.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly quota</span>
            <span className="text-muted-foreground">{meters.quota.limit.toLocaleString()}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${quotaPercent}%` }} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">Active meters: {meters.active}</Badge>
            <Badge variant="outline">Defined: {meters.defined}</Badge>
            <Badge variant="outline">Lag: {meters.lagMs}ms</Badge>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Usage Summary"
        description="GET /v1/usage"
        action={<Badge variant="secondary">{usageSummary.apiActivity} API activity</Badge>}
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between text-foreground">
            <span className="font-semibold">Last 24h</span>
            <span className="text-base font-semibold">{usageSummary.last24h.toLocaleString()} events</span>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <div className="flex items-center justify-between">
              <p>Pipeline status</p>
              <Badge variant="outline">Lag {usageSummary.ingestionLag}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Anomalies detected: {usageSummary.anomalies}</p>
          </div>
          <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3 text-xs text-primary">
            Collectors receiving steady traffic across prod & sandbox.
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Active Subscriptions"
        description="GET /v1/subscriptions"
        action={<Badge variant="outline">Renewals {subscriptions.renewalsDue}</Badge>}
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between text-foreground">
            <span className="font-semibold">Live</span>
            <span className="text-lg font-semibold">{subscriptions.active.toLocaleString()}</span>
          </div>
          <p>Churn risk accounts flagged: {subscriptions.churnRisk}</p>
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="secondary">Products {products.published}/{products.total}</Badge>
            <Badge variant="outline">Experiments {products.experiments}</Badge>
            <Badge variant="outline">Price models {prices.models.length}</Badge>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Invoice Summary"
        description="GET /v1/invoices"
        action={
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{invoiceSummary.totalAmount} billed</Badge>
            <Badge variant="outline">Billing profile {billingProfile.status}</Badge>
          </div>
        }
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between text-foreground">
            <span className="font-semibold">Paid</span>
            <span className="text-lg font-semibold">{invoiceSummary.paid}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Open</span>
            <Badge variant="outline">{invoiceSummary.open}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Retrying</span>
            <Badge variant="outline">{invoiceSummary.retrying}</Badge>
          </div>
          <p className="text-xs">Delivery latency elevated for invoices in retry.</p>
        </div>
      </DashboardCard>

      <DashboardCard
        title="Webhook Health"
        description="GET /v1/webhooks"
        action={<Badge variant="outline">Median {webhooks.medianLatency}</Badge>}
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between text-foreground">
            <span className="font-semibold">Healthy endpoints</span>
            <span className="text-lg font-semibold">{webhooks.healthy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Failing</span>
            <Badge variant="destructive">{webhooks.failing}</Badge>
          </div>
          <p className="text-xs">Retries queued: {webhooks.retriesQueued}</p>
          <Link href="/webhooks" className="inline-flex items-center text-xs font-medium text-primary">
            View delivery logs <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </DashboardCard>

      <DashboardCard
        title="API Activity"
        description="Usage ingestion & keys"
        action={<Badge variant="outline">Keys active: {apiKeys.active}</Badge>}
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between text-foreground">
            <span className="font-semibold">Throughput</span>
            <span className="text-base font-semibold">{usageSummary.apiActivity}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="secondary">Sandbox {apiKeys.sandbox}</Badge>
            <Badge variant="secondary">Production {apiKeys.production}</Badge>
            <Badge variant="outline">Last rotated {apiKeys.lastRotated}</Badge>
          </div>
          <p className="text-xs">Rotate keys regularly and monitor ingress anomalies.</p>
        </div>
      </DashboardCard>
    </section>
  );
}

export default function DashboardPage() {
  const [setupCompletion, setSetupCompletion] = useState<number>(0);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('tenant_setup_progress') : null;
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Record<string, string>;
      const completed = Object.values(parsed).filter((status) => status === 'completed').length;
      setSetupCompletion(Math.round((completed / totalSetupSteps) * 100));
    } catch (error) {
      console.error('Unable to read setup progress', error);
    }
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border/70 bg-gradient-to-r from-background via-primary/5 to-background p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">Tenant billing console</p>
            <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Monitor revenue, subscriptions, and tenant health from a single pane of glass.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="secondary" className="rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200">
              Sandbox
            </Badge>
            <Badge variant="outline" className="rounded-full">v1.0</Badge>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <ArrowUpRight className="h-4 w-4" /> Setup {setupCompletion || 30}% complete
            </span>
          </div>
        </div>
      </section>

      <TenantSetupAssistant />

      <GettingStartedStripe />

      <FeatureEnablementGuide />

      <EnterpriseInsights />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.badge}
            action={<Badge variant="secondary">{card.badge}</Badge>}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold leading-tight">{card.value}</p>
                <p className="text-sm text-muted-foreground">{card.delta}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </DashboardCard>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <DashboardCard
          title="Revenue performance"
          description="Trailing 12 weeks"
          className="xl:col-span-2"
          action={<Button variant="outline" size="sm">Download</Button>}
        >
          <div className="h-64 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50" role="presentation" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ label: 'MRR', value: '$482.4k' }, { label: 'ARR', value: '$5.7M' }, { label: 'Net churn', value: '1.2%' }].map(
              (stat) => (
                <div key={stat.label} className="rounded-lg border bg-background px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
              ),
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Usage coverage"
          description="Event ingestion and metering health"
          action={<Badge variant="outline">Live</Badge>}
        >
          <div className="space-y-3">
            {[
              { label: 'Events processed (24h)', value: '1.2M', fill: 'w-[88%]' },
              { label: 'At-least-once delivery', value: '99.3%', fill: 'w-[93%]' },
              { label: 'Pipeline lag', value: '2m 14s', fill: 'w-[35%]' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">{item.label}</p>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className={`h-2 rounded-full bg-primary ${item.fill}`} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <DashboardCard
          title="Alerts"
          description="Operational signals across tenants"
          action={<Button variant="ghost" size="sm">View logs</Button>}
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert key={alert.title} variant={alert.variant}>
                <alert.icon className="text-muted-foreground" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Billing tasks"
          description="Quick actions to keep collections healthy"
          action={<Button size="sm">Create task</Button>}
        >
          <div className="space-y-3">
            {[
              'Confirm June invoice templates',
              'Rotate sandbox API keys',
              'Review usage anomalies for atlas-sandbox',
            ].map((task) => (
              <div key={task} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm">
                <p className="text-foreground">{task}</p>
                <Badge variant="secondary">Pending</Badge>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        title="Recent invoices"
        description="Latest issued invoices across active tenants"
        action={<Button variant="outline" size="sm">Export CSV</Button>}
      >
        <div className="rounded-xl border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Issued</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{invoice.amount}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{invoice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>Forecasted collections for next cycle are trending +6.3%.</span>
          </div>
          <Badge variant="secondary" className="rounded-full">Auto-collection enabled</Badge>
        </div>
      </DashboardCard>
    </div>
  );
}
