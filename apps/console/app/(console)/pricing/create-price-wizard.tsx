'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@smallbiznis/ui/dialog';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@smallbiznis/ui/select';
import { Separator } from '@smallbiznis/ui/separator';
import { Switch } from '@smallbiznis/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@smallbiznis/ui/tabs';
import { Textarea } from '@smallbiznis/ui/textarea';
import { CheckCircle2, Wand2 } from 'lucide-react';

const steps = ['Details', 'Billing', 'Review'];

export default function CreatePriceWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(steps[0]);
  const [isUsageBased, setIsUsageBased] = useState(true);

  const nextStep = useMemo(() => {
    const index = steps.indexOf(step);
    return steps[index + 1];
  }, [step]);

  const previousStep = useMemo(() => {
    const index = steps.indexOf(step);
    return steps[index - 1];
  }, [step]);

  const handleContinue = () => {
    const index = steps.indexOf(step);
    setStep(steps[Math.min(index + 1, steps.length - 1)]);
  };

  const handleBack = () => {
    const index = steps.indexOf(step);
    setStep(steps[Math.max(index - 1, 0)]);
  };

  const resetWizard = () => {
    setStep(steps[0]);
    setIsUsageBased(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Wand2 className="h-4 w-4" />
          Create price
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create price</DialogTitle>
          <p className="text-sm text-muted-foreground">Launch a new billing construct in just a few guided steps.</p>
        </DialogHeader>

        <Tabs value={step} onValueChange={setStep} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            {steps.map((s) => (
              <TabsTrigger key={s} value={s} className="text-sm">
                {s}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Price details</CardTitle>
                <CardDescription>Describe what this price unlocks for your customers.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price-name">Name</Label>
                  <Input id="price-name" placeholder="Pro usage" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select defaultValue="usage-api">
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usage-api">Usage API</SelectItem>
                      <SelectItem value="seat-billing">Seat-based billing</SelectItem>
                      <SelectItem value="professional-services">Professional services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Summary</Label>
                  <Textarea
                    id="description"
                    placeholder="What does this price include?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Metering</CardTitle>
                <CardDescription>Link to a meter if this price is consumption-based.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Usage-based billing</p>
                    <p className="text-xs text-muted-foreground">Charge based on meter events rather than seats.</p>
                  </div>
                  <Switch checked={isUsageBased} onCheckedChange={setIsUsageBased} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="meter">Meter</Label>
                    <Select defaultValue="event-volume" disabled={!isUsageBased}>
                      <SelectTrigger id="meter">
                        <SelectValue placeholder="Select meter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event-volume">Event volume</SelectItem>
                        <SelectItem value="api-calls">API calls</SelectItem>
                        <SelectItem value="storage-gb">Storage (GB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit label</Label>
                    <Input id="unit" placeholder="events" disabled={!isUsageBased} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Billing cadence</CardTitle>
                <CardDescription>Define how and when customers are invoiced.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="interval">Interval</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="interval">
                      <SelectValue placeholder="Billing interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="one_time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Base amount</Label>
                  <Input id="amount" type="number" min={0} step="0.01" placeholder="0.00" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add-ons & trials</CardTitle>
                <CardDescription>Optional collections controls before invoicing starts.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="trial">Trial period (days)</Label>
                  <Input id="trial" type="number" min={0} step={1} placeholder="14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proration">Proration behavior</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="proration">
                      <SelectValue placeholder="Proration setting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Bill immediately</SelectItem>
                      <SelectItem value="next">Next invoice</SelectItem>
                      <SelectItem value="never">Do not prorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Internal notes</Label>
                  <Textarea id="notes" rows={3} placeholder="Visibility, discount rules, or contract context" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Review summary</CardTitle>
                <CardDescription>Confirm the billing configuration before issuing the price.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <SummaryItem label="Product" value="Usage API" />
                <SummaryItem label="Billing interval" value="Monthly" />
                <SummaryItem label="Currency" value="USD" />
                <SummaryItem label="Meter" value={isUsageBased ? 'Event volume' : 'None (flat)'} />
                <SummaryItem label="Base amount" value="$0.00 + usage" />
                <SummaryItem label="Trial" value="14 days" />
              </CardContent>
            </Card>
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Ready to issue a new price. You can attach entitlements after creation.</span>
              </div>
              <Badge variant="secondary" className="rounded-full">Version 1</Badge>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />
        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="rounded-full">Autopublish</Badge>
            <span>All prices sync to billing profile and webhooks.</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetWizard}>
              Cancel
            </Button>
            <Button variant="ghost" disabled={!previousStep} onClick={handleBack}>
              Back
            </Button>
            <Button onClick={nextStep ? handleContinue : resetWizard}>{nextStep ? 'Continue' : 'Create price'}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-lg border bg-muted/40 p-3">
      <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
