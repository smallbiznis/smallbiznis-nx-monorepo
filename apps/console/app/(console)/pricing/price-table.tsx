import Link from 'next/link';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { ArrowUpRight } from 'lucide-react';

export type Price = {
  id: string;
  name: string;
  product: string;
  interval: 'monthly' | 'yearly' | 'one_time';
  amount: string;
  currency: string;
  billingModel: 'flat' | 'per_unit' | 'tiered';
  status: 'active' | 'draft' | 'archived';
  meter?: string;
  tags?: string[];
};

const statusVariant: Record<Price['status'], 'default' | 'secondary' | 'destructive'> = {
  active: 'default',
  draft: 'secondary',
  archived: 'destructive',
};

export default function PriceTable({ prices }: { prices: Price[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base">Prices</CardTitle>
          <CardDescription>Manage recurring, usage, and one-time prices for your catalog.</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="/products">
            Go to products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Interval</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price) => (
                <TableRow key={price.id} className="hover:bg-muted/40">
                  <TableCell className="space-y-1 font-medium">
                    <Link href={`/pricing/${price.id}`} className="hover:underline">
                      {price.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{price.currency.toUpperCase()}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{price.product}</TableCell>
                  <TableCell className="text-sm capitalize">
                    <Badge variant="outline" className="capitalize">
                      {price.billingModel.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm capitalize">
                    {price.interval === 'one_time' ? 'One-time' : price.interval}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[price.status]} className="capitalize">
                      {price.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">{price.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
