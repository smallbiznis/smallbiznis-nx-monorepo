'use client';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@smallbiznis/ui/select';
import { Switch } from '@smallbiznis/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { Textarea } from '@smallbiznis/ui/textarea';
import { Banknote, Building2, CreditCard, ShieldCheck, Wallet } from 'lucide-react';

const paymentMethods = [
  {
    label: 'Corporate Visa •••• 2841',
    type: 'Card',
    status: 'Default',
    limit: '$150,000 / txn',
    lastUsed: 'Today, 10:04a',
  },
  {
    label: 'Primary treasury •••• 9201',
    type: 'ACH',
    status: 'Auto-collection',
    limit: '$500,000 / txn',
    lastUsed: 'Jun 2, 3:14p',
  },
  {
    label: 'International SWIFT (USD)',
    type: 'Wire',
    status: 'Manual',
    limit: '$2,000,000 / txn',
    lastUsed: 'May 28, 8:42a',
  },
];

export default function BillingProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Payments, tax, and remittance controls</p>
          <h1 className="text-2xl font-semibold">Billing Profile</h1>
          <p className="text-muted-foreground">Configure how you get paid, who signs invoices, and compliance defaults.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ShieldCheck className="h-4 w-4" /> Refresh compliance
          </Button>
          <Button size="sm" className="gap-2">
            <CreditCard className="h-4 w-4" /> Add payment method
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Default remittance', value: 'ACH + card' }, { label: 'Tax residence', value: 'Delaware, USA' }, { label: 'Billing entity', value: 'SmallBiznis Inc.' }, { label: 'Dunning coverage', value: 'Enabled (3 stages)' }].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-lg font-semibold leading-tight">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Audited 5m ago</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="h-4 w-4" /> Payment methods
            </CardTitle>
            <CardDescription>Control which rails we use for auto-collection and refunds.</CardDescription>
          </div>
          <Button variant="outline" size="sm">Manage payouts</Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMethods.map((method) => (
                <TableRow key={method.label}>
                  <TableCell className="font-medium">{method.label}</TableCell>
                  <TableCell>{method.type}</TableCell>
                  <TableCell>
                    <Badge variant={method.status === 'Default' ? 'secondary' : 'outline'}>{method.status}</Badge>
                  </TableCell>
                  <TableCell>{method.limit}</TableCell>
                  <TableCell className="text-muted-foreground">{method.lastUsed}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm">Set default</Button>
                    <Button variant="ghost" size="sm">Replace</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-4 w-4" /> Billing entity & contacts
            </CardTitle>
            <CardDescription>Ensure invoices reflect the right legal entity and contacts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="entity">Legal entity</Label>
              <Input id="entity" placeholder="SmallBiznis Inc." defaultValue="SmallBiznis Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Remit-to address</Label>
              <Input id="address" placeholder="123 Billing St, Suite 400" defaultValue="123 Billing St, Suite 400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-contact">Billing contact</Label>
              <Input id="billing-contact" placeholder="billing@company.com" defaultValue="billing@smallbiznis.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ap-contact">AP contact</Label>
              <Input id="ap-contact" placeholder="ap@company.com" defaultValue="ap@smallbiznis.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Invoice timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">US/Eastern</SelectItem>
                  <SelectItem value="pst">US/Pacific</SelectItem>
                  <SelectItem value="cet">CET</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Statement currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                  <SelectItem value="cad">CAD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Banknote className="h-4 w-4" /> Tax & invoicing
            </CardTitle>
            <CardDescription>Tax identification, collection policy, and reverse charge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax ID / VAT</Label>
              <Input id="tax-id" placeholder="US EIN or VAT" defaultValue="US 12-3456789" />
              <p className="text-xs text-muted-foreground">Shown on invoices & tax certificates.</p>
            </div>
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Tax collection</p>
                  <p className="text-xs text-muted-foreground">Automatically apply tax by customer nexus.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Reverse charge invoices</p>
                  <p className="text-xs text-muted-foreground">Support EU B2B self-assessment.</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tax-engine">Tax provider</Label>
                <Select defaultValue="internal">
                  <SelectTrigger id="tax-engine">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal engine</SelectItem>
                    <SelectItem value="avalara">Avalara</SelectItem>
                    <SelectItem value="stripe">Stripe Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Billing preferences</CardTitle>
            <CardDescription>Invoice cadence, dunning, and communications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cadence">Invoice cadence</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="cadence">
                    <SelectValue placeholder="Select cadence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-dates">Payment terms</Label>
                <Select defaultValue="net15">
                  <SelectTrigger id="due-dates">
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due">Due on receipt</SelectItem>
                    <SelectItem value="net15">Net 15</SelectItem>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net45">Net 45</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-collection</p>
                  <p className="text-xs text-muted-foreground">Attempt card/ACH on invoice issue.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Dunning sequences</p>
                  <p className="text-xs text-muted-foreground">3-stage cadence with smart retries.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email recipients</p>
                  <p className="text-xs text-muted-foreground">Copy finance + account teams.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Remittance & notes</CardTitle>
            <CardDescription>Instructions displayed on invoices and receipts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="remittance">Remittance instructions</Label>
              <Textarea
                id="remittance"
                rows={5}
                defaultValue={'Wire: JPMorgan Chase\nABA: 021000021 | Acct: 098210392\nSWIFT: CHASUS33 | Ref: <Invoice #>'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memo">Invoice memo</Label>
              <Textarea id="memo" rows={3} placeholder="Optional note on each invoice" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Attach compliance docs</p>
                <p className="text-xs text-muted-foreground">SOC2 report and W-9 distributed on issue.</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <ShieldCheck className="h-4 w-4" /> Upload
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
