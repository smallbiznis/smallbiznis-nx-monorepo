import Link from 'next/link';

import { InvoiceLineItems, InvoiceLineItem } from '../invoice-line-items';
import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Separator } from '@smallbiznis/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { Textarea } from '@smallbiznis/ui/textarea';
import { AlertCircle, ArrowLeft, ArrowUpRight, Download, Mail, Receipt, ShieldCheck, Wallet } from 'lucide-react';

const invoice = {
  id: 'inv_00124',
  customer: 'Nova Biosystems',
  amountDue: '$42,840.00',
  status: 'Due',
  issued: 'Jun 1, 2024',
  due: 'Jun 15, 2024',
  period: 'May 2024',
  method: 'ACH + card on file',
  contact: 'billing@novabio.com',
};

const lineItems: InvoiceLineItem[] = [
  {
    description: 'Usage API - Pro',
    detail: 'Metered events · includes premium support',
    quantity: 1,
    unitPrice: '$36,800.00',
    amount: '$36,800.00',
    badge: 'Usage',
  },
  {
    description: 'Seats',
    detail: '145 active seats · $30 each',
    quantity: 145,
    unitPrice: '$30.00',
    amount: '$4,350.00',
    badge: 'Recurring',
  },
  {
    description: 'Implementation services',
    detail: 'Data migration and solution architecture',
    quantity: 1,
    unitPrice: '$1,690.00',
    amount: '$1,690.00',
    badge: 'One-time',
  },
];

const adjustments = [
  { label: 'Credits applied', value: '$0.00' },
  { label: 'Discounts', value: '$0.00' },
  { label: 'Tax', value: '$0.00' },
];

const activity = [
  {
    label: 'Invoice issued',
    timestamp: 'Jun 1, 2024 · 9:32 AM UTC',
    detail: 'Auto-generated after monthly close',
  },
  {
    label: 'Payment attempt',
    timestamp: 'Jun 2, 2024 · 4:10 PM UTC',
    detail: 'ACH on file · pending settlement',
  },
  {
    label: 'Reminder scheduled',
    timestamp: 'Jun 10, 2024 · 12:00 PM UTC',
    detail: 'Net 14 cadence · cc account owner',
  },
];

export default function InvoiceDetailPage({ params }: { params: { invoiceId: string } }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/invoices" className="inline-flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Invoices
          </Link>
          <ArrowUpRight className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">{params.invoiceId}</span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Invoice</p>
            <h1 className="text-2xl font-semibold leading-tight">{invoice.customer}</h1>
            <p className="text-sm text-muted-foreground">Period {invoice.period}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              {invoice.status}
            </Badge>
            <Badge variant="secondary">{invoice.method}</Badge>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button className="gap-2">
              <Mail className="h-4 w-4" /> Send reminder
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Amount due', value: invoice.amountDue }, { label: 'Due date', value: invoice.due }, { label: 'Issued', value: invoice.issued }, { label: 'Payment method', value: invoice.method }].map(
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
          <TabsTrigger value="line-items">Line items</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Collection</CardTitle>
                <CardDescription>Attempted payments and contacts</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-full">
                Net 14
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Payment status</p>
                <p className="font-semibold text-foreground">{invoice.status}</p>
                <p className="text-xs text-muted-foreground">ACH pending · retry cards on fail</p>
              </div>
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Billing contact</p>
                <p className="font-semibold text-foreground">{invoice.contact}</p>
                <p className="text-xs text-muted-foreground">CC account owners and finance</p>
              </div>
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Payment preference</p>
                <p className="font-semibold text-foreground">{invoice.method}</p>
                <p className="text-xs text-muted-foreground">Fallback to corporate card on day 10</p>
              </div>
              <div className="space-y-2 rounded-lg border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Collections risk</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" /> Low · on-time last 6 invoices
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adjustments</CardTitle>
              <CardDescription>Credits, discounts, and tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {adjustments.map((adjustment) => (
                <div key={adjustment.label} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm text-muted-foreground">{adjustment.label}</span>
                  <span className="font-semibold text-foreground">{adjustment.value}</span>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Notes</p>
                <Textarea placeholder="Add internal notes for collections team" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line-items" className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InvoiceLineItems items={lineItems} subtotal="$42,840.00" tax="$0.00" total="$42,840.00" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Payment timeline</CardTitle>
              <CardDescription>Attempts, settlements, and escalations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border p-3 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                Attempt ACH · pending
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3 text-sm text-muted-foreground">
                <Receipt className="h-4 w-4" />
                Retries on card after 3 days
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                Flag as overdue on Jun 16
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activity log</CardTitle>
              <CardDescription>System events for this invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((event) => (
                <div key={event.label} className="flex flex-col gap-1 rounded-lg border p-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.detail}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
              <CardDescription>Emails, reminders, and receipts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3 text-sm text-muted-foreground">
                <span>Reminder cadence</span>
                <Badge variant="outline" className="rounded-full">
                  Net 14
                </Badge>
              </div>
              <div className="space-y-2 rounded-lg border p-3 text-sm text-muted-foreground">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Recipients</p>
                <p>{invoice.contact}</p>
                <p>finance@novabio.com</p>
              </div>
              <div className="space-y-2 rounded-lg border p-3 text-sm text-muted-foreground">
                <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Last email</p>
                <p>Invoice issued · Jun 1, 2024</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
