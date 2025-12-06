'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Progress } from '@smallbiznis/ui/progress';
import { Separator } from '@smallbiznis/ui/separator';
import { cn } from '@smallbiznis/ui/utils';
import { ArrowUpRight, CheckCircle2, Clock3, PauseCircle, ShieldCheck } from 'lucide-react';

type StepStatus = 'pending' | 'in-progress' | 'completed';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  href: string;
  helpHref: string;
}

const steps: SetupStep[] = [
  {
    id: 'billing-profile',
    title: 'Configure Billing Profile',
    description: 'Add remittance details, tax identity, and payout configuration to issue invoices.',
    href: '/billing-profile',
    helpHref: '#',
  },
  {
    id: 'api-keys',
    title: 'Generate API Keys',
    description: 'Provision publishable and secret keys per environment to authenticate collectors.',
    href: '/api-keys',
    helpHref: '#',
  },
  {
    id: 'meters',
    title: 'Define Meters (Metric Definitions)',
    description: 'Register measurable events to power usage-based billing and quota enforcement.',
    href: '/meters',
    helpHref: '#',
  },
  {
    id: 'products',
    title: 'Create Products',
    description: 'Model billable offerings and attach price books for packaging experiments.',
    href: '/products',
    helpHref: '#',
  },
  {
    id: 'pricing',
    title: 'Create Pricing Models (Flat / Tiered / Usage-based)',
    description: 'Stand up price entries across flat, tiered, and usage-based strategies.',
    href: '/pricing',
    helpHref: '#',
  },
  {
    id: 'webhooks',
    title: 'Configure Webhooks (event delivery)',
    description: 'Subscribe delivery endpoints to billing events with signing secrets.',
    href: '/webhooks',
    helpHref: '#',
  },
  {
    id: 'usage-inspector',
    title: 'Send a Test Usage Event (via the API)',
    description: 'Verify ingestion and metering by emitting a representative usage event.',
    href: '/usage-inspector',
    helpHref: '#',
  },
  {
    id: 'subscriptions',
    title: 'Create a Test Subscription',
    description: 'Activate a customer on a plan to validate lifecycle, proration, and invoicing.',
    href: '/subscriptions',
    helpHref: '#',
  },
  {
    id: 'invoices',
    title: 'Review the Generated Invoice',
    description: 'Confirm charges, taxes, and payment statuses from a generated invoice run.',
    href: '/invoices',
    helpHref: '#',
  },
];

const STORAGE_KEY = 'tenant_setup_progress';

const statusCopy: Record<StepStatus, { label: string; variant: 'secondary' | 'outline' | 'default' }> = {
  pending: { label: 'Pending', variant: 'outline' },
  'in-progress': { label: 'In Progress', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'default' },
};

function getDefaultProgress(): Record<string, StepStatus> {
  return steps.reduce((acc, step, index) => {
    acc[step.id] = index === 0 ? 'in-progress' : 'pending';
    return acc;
  }, {} as Record<string, StepStatus>);
}

export function TenantSetupAssistant() {
  const [progress, setProgress] = useState<Record<string, StepStatus>>(getDefaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, StepStatus>;
        setProgress((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Unable to read tenant setup progress from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completedCount = useMemo(
    () => Object.values(progress).filter((status) => status === 'completed').length,
    [progress],
  );
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const updateStatus = (id: string, status: StepStatus) => {
    setProgress((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <Card className="border-primary/10 bg-muted/30 shadow-sm">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Tenant Setup Assistant</CardTitle>
          <CardDescription>
            Activate your SmallBiznis billing environment with guided, enterprise-ready tasks.
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Completion</p>
            <p className="text-lg font-semibold text-foreground">{progressPercent}%</p>
          </div>
          <div className="w-28 sm:w-40">
            <Progress value={progressPercent} aria-label="Tenant setup completion" />
          </div>
          <Badge variant="secondary" className="gap-1">
            <ShieldCheck className="h-4 w-4" /> Enterprise ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => {
            const status = progress[step.id] ?? 'pending';
            const statusMeta = statusCopy[status];

            return (
              <div
                key={step.id}
                className="group relative flex h-full flex-col rounded-lg border bg-background p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="rounded-full text-[11px]">
                        Step {index + 1}
                      </Badge>
                      <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                    </div>
                    <p className="text-base font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : null}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild size="sm" onClick={() => updateStatus(step.id, 'in-progress')}>
                      <Link href={step.href} className="inline-flex items-center gap-1">
                        Open
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    {status !== 'completed' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateStatus(step.id, 'completed')}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Mark complete
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => updateStatus(step.id, 'in-progress')}
                      >
                        <Clock3 className="h-4 w-4" />
                        Reopen step
                      </Button>
                    )}
                    <Button asChild variant="link" size="sm" className="text-primary/80">
                      <Link href={step.helpHref}>Learn more</Link>
                    </Button>
                  </div>

                  <Separator className="bg-border/60" />

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div
                      className={cn('flex h-9 w-9 items-center justify-center rounded-full border', {
                        'border-green-200 bg-green-50 text-green-700': status === 'completed',
                        'border-primary/30 bg-primary/5 text-primary': status === 'in-progress',
                        'border-muted bg-muted/60 text-muted-foreground': status === 'pending',
                      })}
                    >
                      {status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : status === 'in-progress' ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <PauseCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="space-y-[2px]">
                      <p className="font-medium text-foreground">{statusCopy[status].label}</p>
                      <p className="text-xs text-muted-foreground">
                        {status === 'pending'
                          ? 'Not started yet'
                          : status === 'in-progress'
                            ? 'Work is underway — follow the Open link to complete the action.'
                            : 'Task completed. You can revisit or reopen if needed.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default TenantSetupAssistant;
