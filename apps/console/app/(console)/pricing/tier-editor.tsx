'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Input } from '@smallbiznis/ui/input';
import { Label } from '@smallbiznis/ui/label';
import { Separator } from '@smallbiznis/ui/separator';
import { Switch } from '@smallbiznis/ui/switch';
import { Trash2 } from 'lucide-react';

export type Tier = {
  upto: number | 'infinity';
  unitAmount: number;
  currency: string;
};

const defaultTiers: Tier[] = [
  { upto: 1000, unitAmount: 0.15, currency: 'USD' },
  { upto: 5000, unitAmount: 0.12, currency: 'USD' },
  { upto: 'infinity', unitAmount: 0.09, currency: 'USD' },
];

export default function TierEditor({
  initialTiers = defaultTiers,
  meterName = 'Events',
}: {
  initialTiers?: Tier[];
  meterName?: string;
}) {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [hasOverage, setHasOverage] = useState(true);

  const overageUnitAmount = useMemo(() => {
    const lastTier = tiers[tiers.length - 1];
    return lastTier?.unitAmount ?? 0;
  }, [tiers]);

  const handleUpdate = (index: number, field: keyof Tier, value: number | 'infinity') => {
    setTiers((prev) => prev.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier)));
  };

  const handleRemove = (index: number) => {
    setTiers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTier = () => {
    const nextStart = tiers[tiers.length - 1]?.upto;
    const base = typeof nextStart === 'number' ? nextStart + 1000 : 0;
    setTiers((prev) => [...prev.slice(0, -1), { upto: base, unitAmount: overageUnitAmount, currency: 'USD' }, prev[prev.length - 1]]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base">Usage tiers</CardTitle>
          <CardDescription>Configure tiered unit prices for the associated meter.</CardDescription>
        </div>
        <Badge variant="outline" className="rounded-full">{meterName}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <Switch id="overage" checked={hasOverage} onCheckedChange={setHasOverage} />
            <Label htmlFor="overage" className="text-sm text-foreground">
              Allow overage beyond last tier
            </Label>
          </div>
          <p>Enable overage to automatically charge the last tier rate when consumption exceeds the configured ranges.</p>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <div className="grid grid-cols-12 gap-3 border-b bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            <span className="col-span-5">Tier range</span>
            <span className="col-span-4">Unit price</span>
            <span className="col-span-2">Currency</span>
            <span className="col-span-1 text-right">Actions</span>
          </div>
          <div className="divide-y">
            {tiers.map((tier, index) => (
              <div key={`${tier.upto}-${index}`} className="grid grid-cols-12 items-center gap-3 px-4 py-3 text-sm">
                <div className="col-span-5">
                  <Label className="mb-1 block text-xs text-muted-foreground">Up to</Label>
                  <Input
                    type="number"
                    min={0}
                    disabled={tier.upto === 'infinity'}
                    value={tier.upto === 'infinity' ? '' : tier.upto}
                    placeholder="Unlimited"
                    onChange={(event) => handleUpdate(index, 'upto', Number(event.target.value))}
                  />
                </div>
                <div className="col-span-4">
                  <Label className="mb-1 block text-xs text-muted-foreground">Unit amount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      min={0}
                      value={tier.unitAmount}
                      onChange={(event) => handleUpdate(index, 'unitAmount', Number(event.target.value))}
                    />
                    <span className="text-xs text-muted-foreground">per unit</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <Label className="mb-1 block text-xs text-muted-foreground">Currency</Label>
                  <Input value={tier.currency} disabled />
                </div>
                <div className="col-span-1 flex justify-end">
                  {tier.upto === 'infinity' ? null : (
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Overage behavior: {hasOverage ? 'Continue charging at last tier rate' : 'Pause charges when final tier is reached'}.
            </p>
            <p>
              Effective overage unit rate: <span className="font-semibold text-foreground">${overageUnitAmount.toFixed(2)}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAddTier}>
              Add tier
            </Button>
            <Button>Save tiers</Button>
          </div>
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Tier changes apply to future invoices. Existing subscriptions will continue using their current price version unless you
          migrate them.
        </p>
      </CardContent>
    </Card>
  );
}
