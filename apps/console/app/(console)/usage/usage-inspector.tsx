'use client';

import type React from 'react';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Label } from '@smallbiznis/ui/label';
import { Progress } from '@smallbiznis/ui/progress';
import { Separator } from '@smallbiznis/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { UsageRecord } from './usage-table';
import { AlertTriangle, Clock3, Download, Globe2, Server, Share2, SignalHigh } from 'lucide-react';

type UsageInspectorProps = {
  record: UsageRecord | null;
};

export function UsageInspector({ record }: UsageInspectorProps) {
  if (!record) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Inspector</CardTitle>
          <p className="text-sm text-muted-foreground">Select a row to view the usage trace.</p>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No usage selection yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col gap-1">
        <CardTitle className="text-lg">Inspector</CardTitle>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="outline" className="rounded-full capitalize">
            {record.environment}
          </Badge>
          <Badge variant="secondary" className="rounded-full">{record.meter}</Badge>
          {record.anomaly ? (
            <Badge variant="destructive" className="gap-1 rounded-full px-2 py-1 text-xs">
              <AlertTriangle className="h-3 w-3" /> Anomaly detected
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{record.window}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 rounded-lg border p-3 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Customer</p>
              <p className="font-semibold">{record.customer}</p>
            </div>
            <Button size="sm" variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" /> Share trace
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Detail label="Meter" value={record.meter} />
            <Detail label="Product" value={record.product} />
            <Detail label="Latency" value={record.latency} />
            <Detail label="Country" value={record.country} />
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <MiniMetric label="Usage" value={`${record.value.toLocaleString()} ${record.unit}`} icon={<SignalHigh className="h-4 w-4" />} />
            <MiniMetric label="Cost" value={record.cost} icon={<Download className="h-4 w-4" />} />
            <MiniMetric label="Δ 24h" value={`${record.change > 0 ? '+' : ''}${record.change}%`} icon={<Clock3 className="h-4 w-4" />} trend={record.change} />
          </div>
        </div>

        <Tabs defaultValue="trace" className="space-y-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trace">Trace</TabsTrigger>
            <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="trace" className="space-y-3">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium">Ingestion timeline</p>
              <p className="text-xs text-muted-foreground">Sampled 90th percentile latencies</p>
              <div className="mt-3 h-32 rounded-lg border border-dashed bg-background" />
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Server className="h-4 w-4" /> Source: {record.source}
              </div>
              <p className="text-xs text-muted-foreground">Validated with idempotency and ordering safeguards.</p>
            </div>
          </TabsContent>
          <TabsContent value="dimensions" className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Environment" value={record.environment} icon={<Globe2 className="h-3 w-3" />} />
              <Detail label="Region" value={record.country} />
              <Detail label="Latency" value={record.latency} />
              <Detail label="Window" value={record.window} />
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <Label>Quality score</Label>
              <Progress value={record.anomaly ? 42 : 92} />
              <p className="text-xs text-muted-foreground">Normalized ingestion health based on retries, duplicates, and outliers.</p>
            </div>
          </TabsContent>
          <TabsContent value="alerts" className="space-y-3">
            {record.anomaly ? (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
                <div className="flex items-center gap-2 font-medium text-destructive">
                  <AlertTriangle className="h-4 w-4" /> Sudden spike in {record.meter}
                </div>
                <p className="text-xs text-muted-foreground">24h change breached your alert threshold. Escalate to on-call?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="destructive">Page on-call</Button>
                  <Button size="sm" variant="outline">Silence for 1h</Button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border p-4 text-sm text-muted-foreground">No alerts for this slice.</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function Detail({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function MiniMetric({ label, value, icon, trend }: { label: string; value: string; icon: React.ReactNode; trend?: number }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
      {typeof trend === 'number' ? (
        <p className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-destructive'}`}>
          {trend > 0 ? '+' : ''}
          {trend}% vs 24h
        </p>
      ) : null}
    </div>
  );
}
