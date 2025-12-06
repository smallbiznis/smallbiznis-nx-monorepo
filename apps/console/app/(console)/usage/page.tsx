'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@smallbiznis/ui/select';
import { Separator } from '@smallbiznis/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { UsageInspector } from './usage-inspector';
import { UsageRecord, UsageTable } from './usage-table';
import { Activity, AlertTriangle, BarChart2, Filter, PlayCircle, RefreshCcw, Save } from 'lucide-react';

const usageData: UsageRecord[] = [
  {
    id: 'evt_001',
    customer: 'Helix Security',
    product: 'Security API',
    meter: 'api.requests',
    environment: 'prod',
    window: 'Jun 4, 2:20p — 2:25p UTC',
    value: 28030,
    unit: 'calls',
    cost: '$842.10',
    change: 18,
    source: 'edge-worker-us-east-1',
    latency: '126ms p95',
    country: 'US',
    anomaly: true,
  },
  {
    id: 'evt_002',
    customer: 'Nova Biosystems',
    product: 'Data Sync',
    meter: 'records.ingested',
    environment: 'prod',
    window: 'Jun 4, 2:00p — 2:05p UTC',
    value: 532000,
    unit: 'rows',
    cost: '$1,180.00',
    change: 5,
    source: 'streaming-firehose',
    latency: '842ms p95',
    country: 'DE',
  },
  {
    id: 'evt_003',
    customer: 'Reflect Labs',
    product: 'Workflow Orchestrator',
    meter: 'workflow.runs',
    environment: 'staging',
    window: 'Jun 4, 1:30p — 1:35p UTC',
    value: 940,
    unit: 'runs',
    cost: '$204.90',
    change: -12,
    source: 'worker-pool-eu-west-2',
    latency: '432ms p95',
    country: 'IE',
  },
  {
    id: 'evt_004',
    customer: 'Southport Analytics',
    product: 'Insights',
    meter: 'dash.views',
    environment: 'prod',
    window: 'Jun 4, 1:15p — 1:20p UTC',
    value: 12840,
    unit: 'views',
    cost: '$280.10',
    change: 2,
    source: 'edge-worker-us-east-1',
    latency: '92ms p95',
    country: 'US',
  },
  {
    id: 'evt_005',
    customer: 'Helix Security',
    product: 'Security API',
    meter: 'auth.zones',
    environment: 'dev',
    window: 'Jun 4, 1:00p — 1:05p UTC',
    value: 3800,
    unit: 'zones',
    cost: '$120.50',
    change: 35,
    source: 'lambda-ap-south-1',
    latency: '212ms p95',
    country: 'IN',
  },
  {
    id: 'evt_006',
    customer: 'Vertex AI Co',
    product: 'Model Hosting',
    meter: 'gpu.hours',
    environment: 'prod',
    window: 'Jun 4, 12:30p — 12:35p UTC',
    value: 86,
    unit: 'hours',
    cost: '$910.20',
    change: -4,
    source: 'gpu-a100-cluster',
    latency: '38ms p95',
    country: 'US',
  },
  {
    id: 'evt_007',
    customer: 'Northwind AI',
    product: 'Inference',
    meter: 'tokens.generated',
    environment: 'staging',
    window: 'Jun 4, 12:00p — 12:05p UTC',
    value: 189000,
    unit: 'tokens',
    cost: '$140.00',
    change: 12,
    source: 'llm-proxy',
    latency: '220ms p95',
    country: 'GB',
  },
  {
    id: 'evt_008',
    customer: 'Nova Biosystems',
    product: 'Data Sync',
    meter: 'records.ingested',
    environment: 'dev',
    window: 'Jun 4, 11:50a — 11:55a UTC',
    value: 72000,
    unit: 'rows',
    cost: '$142.10',
    change: 8,
    source: 'streaming-firehose',
    latency: '1.1s p95',
    country: 'PL',
  },
];

export default function UsagePage() {
  const [environment, setEnvironment] = useState<'all' | UsageRecord['environment']>('all');
  const [timeframe, setTimeframe] = useState('last-24h');
  const [selectedRecord, setSelectedRecord] = useState<UsageRecord | null>(usageData[0]);

  const filteredData = useMemo(() => {
    return usageData.filter((row) => (environment === 'all' ? true : row.environment === environment));
  }, [environment]);

  const totals = useMemo(() => {
    const usage = filteredData.reduce((sum, row) => sum + row.value, 0);
    const anomalies = filteredData.filter((row) => row.anomaly).length;
    return { usage, anomalies };
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Understand every meter pulse</p>
          <h1 className="text-2xl font-semibold">Usage explorer</h1>
          <p className="text-muted-foreground">Slice metered events by environment, customer, and dimensions to debug spend.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="h-4 w-4" /> Save view
          </Button>
          <Button size="sm" className="gap-2">
            <PlayCircle className="h-4 w-4" /> Replay window
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total usage ({environment === 'all' ? 'all envs' : environment})</CardDescription>
            <CardTitle className="text-3xl font-semibold">{totals.usage.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Aggregated across all meters in the selected window.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Anomalies</CardDescription>
            <CardTitle className="text-3xl font-semibold">{totals.anomalies}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Spikes over baseline
            </div>
            <p>Investigate unexpected bursts before invoicing.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Top meter</CardDescription>
            <CardTitle className="text-xl font-semibold">api.requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Helix Security</p>
            <p>Edge ingress dominates usage over the last 24h.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Quality</CardDescription>
            <CardTitle className="text-3xl font-semibold">99.3%</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="text-foreground">Validated ingest and deduplication</p>
            <p>Retries and out-of-order events are within tolerance.</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="meters">Meters</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="gap-3 lg:flex lg:items-center lg:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">Timeframe & facets</CardTitle>
                <CardDescription>Control the window, environment, and grouping for your analysis.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="space-y-1">
                  <Label htmlFor="timeframe">Window</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger id="timeframe" className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-15m">Last 15 minutes</SelectItem>
                      <SelectItem value="last-1h">Last 1 hour</SelectItem>
                      <SelectItem value="last-24h">Last 24 hours</SelectItem>
                      <SelectItem value="last-7d">Last 7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="environment">Environment</Label>
                  <Select
                    value={environment}
                    onValueChange={(value) => setEnvironment(value as 'all' | UsageRecord['environment'])}
                  >
                    <SelectTrigger id="environment" className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="prod">Prod</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="dev">Dev</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="group">Group by</Label>
                  <Select defaultValue="customer.meter">
                    <SelectTrigger id="group" className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer.meter">customer + meter</SelectItem>
                      <SelectItem value="product">product</SelectItem>
                      <SelectItem value="country">country</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-3">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Usage timeseries ({timeframe.replace('-', ' ')})</span>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCcw className="h-4 w-4" /> Refresh
                    </Button>
                  </div>
                  <div className="mt-3 h-48 rounded-lg border border-dashed bg-background" />
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="rounded-full">Latency p95</Badge>
                  <Badge variant="secondary" className="rounded-full">Errors</Badge>
                  <Badge variant="outline" className="rounded-full">Ingest success</Badge>
                </div>
              </div>
              <div className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Filter className="h-4 w-4" /> Active filters
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="rounded-full bg-muted px-3 py-1">country: US, DE, IE</Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">meter: api.requests</Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">status: anomalies</Badge>
                </div>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Sample rate</p>
                    <p className="font-semibold">100% (no sampling)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Export</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Activity className="h-4 w-4" /> CSV
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <BarChart2 className="h-4 w-4" /> Chart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <UsageTable data={filteredData} selectedId={selectedRecord?.id} onSelect={setSelectedRecord} />
            </div>
            <UsageInspector record={selectedRecord} />
          </div>
        </TabsContent>

        <TabsContent value="meters">
          <Card>
            <CardHeader>
              <CardTitle>Meters</CardTitle>
              <CardDescription>Identify top billing meters by spend and velocity.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {["api.requests", "records.ingested", "tokens.generated"].map((meter) => (
                <div key={meter} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{meter}</p>
                    <Badge variant="outline" className="rounded-full">Hot</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Rolling 24h trend</p>
                  <div className="mt-3 h-20 rounded border border-dashed bg-muted/50" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Break down usage by tenant to spot expansion or churn risk.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <Label htmlFor="customer-search">Search</Label>
                  <Input id="customer-search" placeholder="Customer name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="customer-country">Country</Label>
                  <Input id="customer-country" placeholder="US" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="customer-window">Window</Label>
                  <Select defaultValue="7d">
                    <SelectTrigger id="customer-window">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {['Helix Security', 'Nova Biosystems', 'Reflect Labs', 'Northwind AI', 'Southport Analytics'].map(
                  (customer) => (
                    <div key={customer} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{customer}</p>
                        <Badge variant="secondary" className="rounded-full">Stable</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Usage over the selected window</p>
                      <div className="mt-3 h-20 rounded border border-dashed bg-muted/50" />
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
