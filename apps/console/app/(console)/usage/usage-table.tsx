'use client';

import { Badge } from '@smallbiznis/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { ScrollArea } from '@smallbiznis/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { cn } from '@smallbiznis/ui/utils';
import { AlertTriangle, ArrowUpRight, BarChart3 } from 'lucide-react';

export type UsageRecord = {
  id: string;
  customer: string;
  product: string;
  meter: string;
  environment: 'prod' | 'staging' | 'dev';
  window: string;
  value: number;
  unit: string;
  cost: string;
  change: number;
  source: string;
  latency: string;
  country: string;
  anomaly?: boolean;
};

type UsageTableProps = {
  data: UsageRecord[];
  selectedId?: string;
  onSelect?: (record: UsageRecord) => void;
};

export function UsageTable({ data, selectedId, onSelect }: UsageTableProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Usage stream</CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time metering events aggregated by meter, customer, and environment.
          </p>
        </div>
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="customer">Customer</Label>
            <div className="relative">
              <ArrowUpRight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="customer" placeholder="Search tenants" className="pl-9" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="meter">Meter</Label>
            <Input id="meter" placeholder="api.requests" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="US" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="gap-1 rounded-full bg-muted px-3 py-1">
            <BarChart3 className="h-3 w-3" /> grouped by customer.meter
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">Live ingestion</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">Window: rolling 1h</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">Anomalies only</Badge>
        </div>
        <ScrollArea className="h-[540px] rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Meter</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Δ 24h</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    'cursor-pointer transition hover:bg-muted/50',
                    selectedId === row.id && 'bg-muted'
                  )}
                  onClick={() => onSelect?.(row)}
                >
                  <TableCell>
                    <div className="font-semibold">{row.customer}</div>
                    <p className="text-xs text-muted-foreground">{row.product}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{row.meter}</span>
                      {row.anomaly ? (
                        <Badge variant="destructive" className="gap-1 rounded-full px-2 py-0.5 text-xs">
                          <AlertTriangle className="h-3 w-3" /> Anomaly
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">{row.window}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full capitalize">
                      {row.environment}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{row.country}</p>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">
                    {row.value.toLocaleString()} {row.unit}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{row.cost}</TableCell>
                  <TableCell className={cn('text-right text-sm', row.change > 0 ? 'text-green-600' : 'text-destructive')}>
                    {row.change > 0 ? '+' : ''}
                    {row.change}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
