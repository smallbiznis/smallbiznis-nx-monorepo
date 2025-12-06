import Link from 'next/link';
import { Badge } from '@smallbiznis/ui/badge';
import { Button, buttonVariants } from '@smallbiznis/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@smallbiznis/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { cn } from '@smallbiznis/ui/utils';
import { ArrowUpRight, Filter, Plus } from 'lucide-react';

const customers = [
  {
    id: 'cus_001',
    name: 'Nova Biosystems',
    email: 'billing@novabio.com',
    status: 'Active',
    plan: 'Enterprise Usage',
    mrr: '$42,800',
    lastInvoice: 'Jun 18',
    health: 'On-track',
  },
  {
    id: 'cus_002',
    name: 'Reflect Labs',
    email: 'ap@reflectlabs.io',
    status: 'Trialing',
    plan: 'Growth Plan',
    mrr: '$6,200',
    lastInvoice: 'Jun 17',
    health: 'Monitoring',
  },
  {
    id: 'cus_003',
    name: 'Helix Security',
    email: 'finance@helix.app',
    status: 'Delinquent',
    plan: 'Enterprise Flat + Overages',
    mrr: '$18,450',
    lastInvoice: 'Jun 15',
    health: 'Needs attention',
  },
  {
    id: 'cus_004',
    name: 'Southport Analytics',
    email: 'ops@southport.ai',
    status: 'Paused',
    plan: 'Startup',
    mrr: '$1,280',
    lastInvoice: 'Jun 10',
    health: 'Paused',
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Tenant billing console</p>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer accounts, lifecycle states, and billing readiness.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="gap-4 space-y-0 md:flex md:items-center md:justify-between">
          <div>
            <CardTitle className="text-lg">Customer roster</CardTitle>
            <p className="text-sm text-muted-foreground">
              View account health, collection status, and assigned plans.
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
                  <SelectItem value="delinquent">Delinquent</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search name, email, or ID" className="w-[260px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-right">MRR</TableHead>
                  <TableHead className="text-right">Last invoice</TableHead>
                  <TableHead className="text-right">Health</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-muted/50">
                    <TableCell className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/customers/${customer.id}`}
                          className={cn(
                            buttonVariants({ variant: 'link' }),
                            'p-0 text-base font-semibold text-foreground hover:no-underline',
                          )}
                        >
                          {customer.name}
                        </Link>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                      <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{customer.id}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.status === 'Delinquent' ? 'destructive' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{customer.plan}</TableCell>
                    <TableCell className="text-right font-semibold">{customer.mrr}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{customer.lastInvoice}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{customer.health}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">11 new signups this week</Badge>
            <span className="hidden sm:inline">·</span>
            <span>Syncs with CRM nightly for lifecycle updates.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
