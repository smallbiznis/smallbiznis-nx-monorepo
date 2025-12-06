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
import { Bell, BookText, CheckCircle2, Cog, ShieldCheck, Users } from 'lucide-react';

const roles = [
  {
    name: 'Owners',
    members: '4',
    permissions: 'All access',
    approval: 'Auto-approved',
  },
  {
    name: 'Finance',
    members: '12',
    permissions: 'Billing + invoices',
    approval: 'Requires review',
  },
  {
    name: 'Support',
    members: '18',
    permissions: 'Read-only billing, usage',
    approval: 'Auto-approved',
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Internal configuration, preferences, and governance</p>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Tune the console experience and how teams collaborate across tenants.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <BookText className="h-4 w-4" /> Audit log
          </Button>
          <Button size="sm" className="gap-2">
            <Cog className="h-4 w-4" /> Save workspace
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Workspace', value: 'SmallBiznis Ops' }, { label: 'Environment', value: 'Live' }, { label: 'SSO', value: 'Okta (SAML)' }, { label: 'Last reviewed', value: 'Today, 9:12a' }].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-lg font-semibold leading-tight">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Synced across all console users</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-4 w-4" /> Workspace profile
            </CardTitle>
            <CardDescription>Identity, region, and operational preferences.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace name</Label>
              <Input id="workspace-name" defaultValue="SmallBiznis Ops" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" defaultValue="smallbiznis-ops" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Primary region</Label>
              <Select defaultValue="us-east-1">
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="locale">Locale</Label>
              <Select defaultValue="en-us">
                <SelectTrigger id="locale">
                  <SelectValue placeholder="Select locale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-us">English (US)</SelectItem>
                  <SelectItem value="en-gb">English (UK)</SelectItem>
                  <SelectItem value="fr-fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-zone">Time zone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="time-zone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">US/Eastern</SelectItem>
                  <SelectItem value="pst">US/Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branding">Brand color</Label>
              <Input id="branding" type="color" defaultValue="#1D4ED8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-4 w-4" /> Notifications & preferences
            </CardTitle>
            <CardDescription>Control console alerts and delivery channels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Weekly summary</Label>
              <Select defaultValue="monday">
                <SelectTrigger id="summary">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Digest of invoices, renewals, and anomalies.</p>
            </div>
            <div className="grid gap-3 rounded-lg border p-4">
              {[{ label: 'Product incidents', description: 'Pager + email for production impacting events' }, { label: 'Invoice events', description: 'Finalized, paid, and failed payment alerts' }, { label: 'Usage anomalies', description: 'Spikes, drops, and forecast changes' }].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="text-sm font-medium">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Quiet hours</p>
                <p className="text-xs text-muted-foreground">Suppress alerts 10p–7a in your time zone.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-4 w-4" /> Access & roles
            </CardTitle>
            <CardDescription>Role-based access with approval policies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Approvals</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.name}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{role.members}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{role.permissions}</TableCell>
                    <TableCell>{role.approval}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Policies</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Require approvals for elevated scopes</p>
                <p className="text-xs text-muted-foreground">Owners or finance must review write access requests.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-4 w-4" /> Data & retention
            </CardTitle>
            <CardDescription>Govern data residency, retention, and backups.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="retention">Retention policy</Label>
              <Select defaultValue="180">
                <SelectTrigger id="retention">
                  <SelectValue placeholder="Select retention" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="export">Data export email</Label>
              <Input id="export" defaultValue="data-exports@smallbiznis.com" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Geo residency lock</p>
                <p className="text-xs text-muted-foreground">Keep data in-region for compliance.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Change management notes</Label>
              <Textarea id="notes" rows={4} placeholder="Document why changes were made" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
