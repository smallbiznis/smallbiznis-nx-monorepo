'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@smallbiznis/ui/select';
import { Switch } from '@smallbiznis/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { KeyRound, Lock, PlusCircle, ShieldCheck, Terminal } from 'lucide-react';

const keys = [
  {
    name: 'Console admin',
    prefix: 'sk_live_9h3v',
    environment: 'prod',
    scopes: 'billing:write, usage:read',
    status: 'Active',
    lastUsed: '5m ago',
    created: 'May 12, 2024',
  },
  {
    name: 'Staging automation',
    prefix: 'sk_test_s8fa',
    environment: 'staging',
    scopes: 'billing:read, products:write',
    status: 'Active',
    lastUsed: '1h ago',
    created: 'May 30, 2024',
  },
  {
    name: 'Data warehouse pull',
    prefix: 'pk_live_c2lk',
    environment: 'prod',
    scopes: 'usage:read',
    status: 'Read-only',
    lastUsed: '12h ago',
    created: 'Apr 18, 2024',
  },
];

function statusBadge(status: string) {
  const variant = status === 'Active' ? 'secondary' : 'outline';
  return <Badge variant={variant as 'secondary' | 'outline'}>{status}</Badge>;
}

export default function ApiKeysPage() {
  const [environment, setEnvironment] = useState<'all' | 'prod' | 'staging' | 'dev'>('all');

  const filteredKeys = useMemo(() => {
    return keys.filter((key) => (environment === 'all' ? true : key.environment === environment));
  }, [environment]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Access tokens, scope enforcement, and rotation</p>
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <p className="text-muted-foreground">Manage secrets per environment with explicit scopes and audit trails.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ShieldCheck className="h-4 w-4" /> Rotate defaults
          </Button>
          <Button size="sm" className="gap-2">
            <PlusCircle className="h-4 w-4" /> Generate key
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Active keys', value: '12' }, { label: 'Last rotation', value: '8 days ago' }, { label: 'Default scope', value: 'billing:read' }, { label: 'IP allowlist', value: 'Enabled' }].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-xl font-semibold leading-tight">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Policy synced across tenants</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <KeyRound className="h-4 w-4" /> Active keys
            </CardTitle>
            <CardDescription>Scoped secrets with environment isolation.</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="space-y-1 text-sm text-muted-foreground">
              <Label className="text-xs uppercase tracking-[0.08em]">Environment</Label>
              <Select value={environment} onValueChange={(value) => setEnvironment(value as typeof environment)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="prod">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Lock className="h-4 w-4" /> Download allowlist
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Name</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((key) => (
                <TableRow key={key.prefix}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>{key.prefix}</TableCell>
                  <TableCell>
                    <Badge variant={key.environment === 'prod' ? 'default' : 'secondary'}>{key.environment}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{key.scopes}</span>
                  </TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell>{key.created}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    {statusBadge(key.status)}
                    <Button variant="ghost" size="sm">Copy</Button>
                    <Button variant="ghost" size="sm">Revoke</Button>
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
              <PlusCircle className="h-4 w-4" /> Create key
            </CardTitle>
            <CardDescription>Provision a new secret with scoped access.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key name</Label>
              <Input id="key-name" placeholder="Ex: Billing automation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-env">Environment</Label>
              <Select defaultValue="prod">
                <SelectTrigger id="key-env">
                  <SelectValue placeholder="Choose environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prod">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-scope">Scopes</Label>
              <Input id="key-scope" placeholder="billing:read, usage:read" defaultValue="billing:write, usage:read" />
              <p className="text-xs text-muted-foreground">Comma separated scopes enforced on every request.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expires">Expires in</Label>
              <Select defaultValue="90d">
                <SelectTrigger id="expires">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                  <SelectItem value="180d">180 days</SelectItem>
                  <SelectItem value="never">Never expires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Mask secrets after creation</p>
                <p className="text-xs text-muted-foreground">Only visible once—store in your secret manager.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create secret</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Terminal className="h-4 w-4" /> Policy & auditing
            </CardTitle>
            <CardDescription>Lock down how keys are used and monitored.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">IP allowlist enforcement</p>
                <p className="text-xs text-muted-foreground">Only allow traffic from trusted CIDRs.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Rotation reminders</p>
                <p className="text-xs text-muted-foreground">Notify owners 10 days before expiry.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Recent events</p>
              {[{ action: 'Key revoked', who: 'sarah@smallbiznis.com', time: 'Today, 10:02a' }, { action: 'Allowlist updated', who: 'ops@smallbiznis.com', time: 'Yesterday, 4:15p' }, { action: 'New secret created', who: 'api@smallbiznis.com', time: 'Jun 1, 9:48a' }].map((log) => (
                <div key={log.time} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.who}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
