'use client';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@smallbiznis/ui/select';
import { Switch } from '@smallbiznis/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@smallbiznis/ui/table';
import { AlertTriangle, Cable, Globe2, RefreshCcw, Send, Shield, Zap } from 'lucide-react';

const endpoints = [
  {
    url: 'https://billing.mycompany.com/hooks/prod',
    environment: 'prod',
    status: 'Healthy',
    events: 'invoice.*, subscription.*',
    latency: '212ms p95',
  },
  {
    url: 'https://staging.mycompany.com/hooks/billing',
    environment: 'staging',
    status: 'Degraded',
    events: 'usage.created',
    latency: '822ms p95',
  },
];

const deliveries = [
  { id: 'evt_01', event: 'invoice.finalized', status: 'Success', endpoint: 'prod', attempt: '1/3', time: '10:03:12' },
  { id: 'evt_02', event: 'subscription.renewed', status: 'Success', endpoint: 'prod', attempt: '1/3', time: '09:54:02' },
  { id: 'evt_03', event: 'usage.created', status: 'Retrying', endpoint: 'staging', attempt: '2/3', time: '09:51:44' },
  { id: 'evt_04', event: 'invoice.payment_failed', status: 'Failed', endpoint: 'prod', attempt: '3/3', time: '09:48:10' },
];

function statusVariant(status: string) {
  if (status === 'Success' || status === 'Healthy') return 'secondary';
  if (status === 'Retrying' || status === 'Degraded') return 'outline';
  return 'destructive';
}

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Delivery health, signing secrets, and replay tools</p>
          <h1 className="text-2xl font-semibold">Webhooks</h1>
          <p className="text-muted-foreground">Manage outbound events, monitor latency, and keep signatures rotating.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCcw className="h-4 w-4" /> Sync schemas
          </Button>
          <Button size="sm" className="gap-2">
            <Send className="h-4 w-4" /> Send test event
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{ label: 'Delivery success (24h)', value: '98.4%' }, { label: 'Avg latency', value: '248ms' }, { label: 'Signed with', value: 'SHA-256 (rotates 30d)' }, { label: 'Subscribed events', value: '14' }].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-xl font-semibold leading-tight">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Monitored continuously</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cable className="h-4 w-4" /> Endpoints
            </CardTitle>
            <CardDescription>Primary and staging destinations for outbound events.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe2 className="h-4 w-4" /> Add endpoint
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">URL</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow key={endpoint.url}>
                  <TableCell className="font-medium">{endpoint.url}</TableCell>
                  <TableCell>
                    <Badge variant={endpoint.environment === 'prod' ? 'default' : 'secondary'}>{endpoint.environment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(endpoint.status) as 'secondary' | 'outline' | 'destructive'}>
                      {endpoint.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{endpoint.events}</TableCell>
                  <TableCell>{endpoint.latency}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="ghost" size="sm">Ping</Button>
                    <Button variant="ghost" size="sm">Pause</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-4 w-4" /> Signing & subscriptions
            </CardTitle>
            <CardDescription>Rotate secrets and choose which events to send.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="secret">Signing secret</Label>
                <Input id="secret" defaultValue="whsec_************************" />
                <p className="text-xs text-muted-foreground">Rotate every 30 days and distribute securely.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="algo">Signature algorithm</Label>
                <Select defaultValue="sha256">
                  <SelectTrigger id="algo">
                    <SelectValue placeholder="Choose algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sha256">HMAC-SHA256</SelectItem>
                    <SelectItem value="ed25519">Ed25519</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-2">
              {[{ label: 'invoice.*', description: 'Creation, finalization, payments' }, { label: 'subscription.*', description: 'Lifecycle, renewals, cancellations' }, { label: 'usage.*', description: 'Meter emissions and anomalies' }, { label: 'customer.updated', description: 'Profile and billing contact changes' }].map((event) => (
                <div key={event.label} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="text-sm font-medium">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-4 w-4" /> Replay & test
            </CardTitle>
            <CardDescription>Validate payloads before shipping code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="replay-event">Replay event</Label>
              <Select defaultValue="invoice.finalized">
                <SelectTrigger id="replay-event">
                  <SelectValue placeholder="Choose event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice.finalized">invoice.finalized</SelectItem>
                  <SelectItem value="invoice.payment_failed">invoice.payment_failed</SelectItem>
                  <SelectItem value="subscription.renewed">subscription.renewed</SelectItem>
                  <SelectItem value="usage.created">usage.created</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">Target endpoint</Label>
              <Select defaultValue="prod">
                <SelectTrigger id="target">
                  <SelectValue placeholder="Select endpoint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prod">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Skip signature</p>
                <p className="text-xs text-muted-foreground">Use unsigned payloads for quick tests.</p>
              </div>
              <Switch />
            </div>
            <Button className="w-full">Send replay</Button>
            <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Last run</p>
              <p>invoice.finalized • Production • 248ms • 2xx</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-4 w-4" /> Recent deliveries
          </CardTitle>
          <CardDescription>Inspect webhook attempts and retry failures.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.event}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(delivery.status) as 'secondary' | 'outline' | 'destructive'}>
                      {delivery.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={delivery.endpoint === 'prod' ? 'default' : 'secondary'}>{delivery.endpoint}</Badge>
                  </TableCell>
                  <TableCell>{delivery.attempt}</TableCell>
                  <TableCell>{delivery.time}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="ghost" size="sm">View payload</Button>
                    <Button variant="ghost" size="sm">Replay</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
