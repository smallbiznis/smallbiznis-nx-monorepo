'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@smallbiznis/ui/select';
import { Separator } from '@smallbiznis/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { ArrowUpRight, Download, FilePlus2, Filter, Mail, RefreshCcw, Search } from 'lucide-react';

const invoices = [
  {
    id: 'inv_00124',
    customer: 'Nova Biosystems',
    amount: '$42,840.00',
    status: 'Due',
    period: 'May 2024',
    issued: 'Jun 1, 2024',
    due: 'Jun 15, 2024',
    method: 'ACH + card',
  },
  {
    id: 'inv_00123',
    customer: 'Helix Security',
    amount: '$18,240.00',
    status: 'Paid',
    period: 'May 2024',
    issued: 'Jun 1, 2024',
    due: 'Jun 15, 2024',
    method: 'Card',
  },
  {
    id: 'inv_00122',
    customer: 'Reflect Labs',
    amount: '$6,120.00',
    status: 'Overdue',
    period: 'Apr 2024',
    issued: 'May 1, 2024',
    due: 'May 15, 2024',
    method: 'Wire',
  },
  {
    id: 'inv_00121',
    customer: 'Northwind AI',
    amount: '$28,010.00',
    status: 'Paid',
    period: 'Apr 2024',
    issued: 'May 1, 2024',
    due: 'May 15, 2024',
    method: 'ACH',
  },
  {
    id: 'inv_00120',
    customer: 'Vertex AI Co',
    amount: '$14,980.00',
    status: 'Due',
    period: 'Apr 2024',
    issued: 'May 1, 2024',
    due: 'May 15, 2024',
    method: 'ACH + card',
  },
];

type InvoiceStatus = 'All' | 'Paid' | 'Due' | 'Overdue';

function statusBadge(status: string) {
  const variant = status === 'Paid' ? 'secondary' : status === 'Due' ? 'outline' : 'destructive';
  return <Badge variant={variant as 'secondary' | 'outline' | 'destructive'}>{status}</Badge>;
}

export default function InvoicesPage() {
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus>('All');
  const [query, setQuery] = useState('');

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesStatus = statusFilter === 'All' ? true : invoice.status === statusFilter;
      const matchesQuery = query
        ? `${invoice.customer} ${invoice.id}`.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Cash collection, confidence, and controls</p>
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <p className="text-muted-foreground">Track invoice aging, send reminders, and export statements.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCcw className="h-4 w-4" /> Sync payments
          </Button>
          <Button size="sm" className="gap-2">
            <FilePlus2 className="h-4 w-4" /> New invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Open balance', value: '$57,820.00' }, { label: 'Past due', value: '$6,120.00' }, { label: 'Collected this month', value: '$61,080.00' }, { label: 'Auto-collection rate', value: '92%' }].map(
          (stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl font-semibold">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Updated just now</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <Card className="space-y-4">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle>Invoice roster</CardTitle>
            <CardDescription>Filter by status or search by customer and invoice ID.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="grid gap-2 text-sm">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as InvoiceStatus)}>
                <SelectTrigger id="status" className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Due">Due</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 text-sm">
              <Label htmlFor="search">Search</Label>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Customer or invoice ID"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-[220px]"
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Advanced filters
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Payment method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/40">
                    <TableCell className="font-semibold text-foreground">
                      <a href={`/invoices/${invoice.id}`} className="inline-flex items-center gap-1 hover:underline">
                        {invoice.id} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{invoice.customer}</TableCell>
                    <TableCell>{statusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{invoice.period}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{invoice.issued}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{invoice.due}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{invoice.method}</TableCell>
                    <TableCell className="text-right font-semibold">{invoice.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </span>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" /> Send reminders
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Download PDFs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
