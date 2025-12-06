'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { Progress } from '@smallbiznis/ui/progress';
import { Separator } from '@smallbiznis/ui/separator';
import { cn } from '@smallbiznis/ui/utils';
import { ArrowUpRight, Check, CheckCircle2, Clock3 } from 'lucide-react';

type StepStatus = 'pending' | 'in-progress' | 'completed';

type SetupStep = {
  id: string;
  title: string;
  description: string;
  href: string;
};

const steps: SetupStep[] = [
  {
    id: 'billing-profile',
    title: 'Configure Billing Profile',
    description: 'Add legal entity, remittance, and payout details to issue invoices.',
    href: '/billing-profile',
  },
  {
    id: 'api-keys',
    title: 'Generate API Keys',
    description: 'Provision publishable and secret keys for sandbox and production.',
    href: '/api-keys',
  },
  {
    id: 'meters',
    title: 'Define Meters (Metric Definitions)',
    description: 'Register measurable events to power usage-based billing and quota enforcement.',
    href: '/meters',
  },
  {
    id: 'products',
    title: 'Create Products',
    description: 'Model your offerings and attach packaging experiments.',
    href: '/products',
  },
  {
    id: 'pricing',
    title: 'Create Pricing Models (Flat / Tiered / Usage-based)',
    description: 'Stand up flat, tiered, or usage-based price definitions for each product.',
    href: '/pricing',
  },
  {
    id: 'webhooks',
    title: 'Configure Webhooks (event delivery)',
    description: 'Subscribe delivery endpoints and signing secrets for billing events.',
    href: '/webhooks',
  },
  {
    id: 'usage',
    title: 'Send Test Usage Event',
    description: 'Emit a representative usage event to validate ingestion.',
    href: '/usage',
  },
  {
    id: 'subscriptions',
    title: 'Create Test Subscription',
    description: 'Activate a customer on a plan to validate lifecycle and proration.',
    href: '/subscriptions',
  },
  {
    id: 'invoices',
    title: 'Review Invoice',
    description: 'Confirm charges, taxes, and payment states from a generated invoice run.',
    href: '/invoices',
  },
];

const STORAGE_KEY = 'tenant_setup_progress';

const statusCopy: Record<StepStatus, { label: string; badge: 'outline' | 'secondary' | 'default' }> = {
  pending: { label: 'Pending', badge: 'outline' },
  'in-progress': { label: 'In progress', badge: 'secondary' },
  completed: { label: 'Completed', badge: 'default' },
};

const defaultProgress: Record<string, StepStatus> = steps.reduce((acc, step) => {
  acc[step.id] = 'pending';
  return acc;
}, {} as Record<string, StepStatus>);

export function TenantSetupAssistant() {
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, StepStatus>>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Record<string, StepStatus>;
      setProgress((prev) => ({ ...prev, ...parsed }));
    } catch (error) {
      console.error('Unable to read tenant setup progress from localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completedSteps = useMemo(
    () => Object.values(progress).filter((status) => status === 'completed').length,
    [progress],
  );
  const completionPercent = Math.round((completedSteps / steps.length) * 100);

  const handleOpen = (stepId: string, href: string) => {
    setProgress((prev) => ({ ...prev, [stepId]: prev[stepId] === 'completed' ? 'completed' : 'in-progress' }));
    router.push(href);
  };

  const markComplete = (stepId: string) => {
    setProgress((prev) => ({ ...prev, [stepId]: prev[stepId] === 'completed' ? 'pending' : 'completed' }));
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-primary/10 bg-muted/30 shadow-sm">
      <CardHeader className="flex flex-col gap-4 border-b bg-gradient-to-r from-background to-primary/5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">Enterprise ready</Badge>
            <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[11px] font-medium text-foreground shadow-sm">
              Guided onboarding
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">Tenant Setup Assistant</CardTitle>
          <CardDescription className="text-base">
            Activate your SmallBiznis billing environment with guided, enterprise-ready tasks.
          </CardDescription>
        </div>
        <div className="flex flex-col gap-3 md:min-w-[280px]">
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>Completion</span>
            <span>{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} aria-label="Tenant setup completion" className="h-2" />
          <p className="text-xs text-muted-foreground">{completedSteps} of {steps.length} steps completed</p>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/80">
          {steps.map((step, index) => {
            const status = progress[step.id] ?? 'pending';
            const meta = statusCopy[status];

            return (
              <div key={step.id} className="p-4 transition hover:bg-muted/40 md:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px]">
                        Step {index + 1}
                      </Badge>
                      <Badge variant={meta.badge} className="rounded-full px-3 py-1 text-[11px]">
                        {meta.label}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-foreground md:text-lg">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-stretch gap-2 text-sm md:w-[320px] md:flex-row md:items-center md:justify-end">
                    <Button
                      size="sm"
                      className="h-10 rounded-full bg-indigo-600 px-4 text-white shadow-sm hover:bg-indigo-500"
                      onClick={() => handleOpen(step.id, step.href)}
                    >
                      <span className="flex items-center gap-2">
                        Open
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn('h-10 rounded-full border border-dashed px-4 text-foreground', {
                        'border-primary/50 text-primary': status === 'completed',
                      })}
                      onClick={() => markComplete(step.id)}
                    >
                      {status === 'completed' ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Mark complete
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-muted/50 p-3 text-xs text-muted-foreground">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow-inner',
                      status === 'completed' && 'border-green-200 text-green-700',
                      status === 'in-progress' && 'border-primary/40 text-primary',
                      status === 'pending' && 'border-muted text-muted-foreground',
                    )}
                  >
                    {status === 'completed' ? (
                      <Check className="h-4 w-4" />
                    ) : status === 'in-progress' ? (
                      <Clock3 className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{meta.label}</p>
                    <p>
                      {status === 'pending'
                        ? 'Ready to start — open the step to begin configuration.'
                        : status === 'in-progress'
                          ? 'Continue setup and complete the checklist when finished.'
                          : 'Completed. You can revisit or reopen if needed.'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <Separator className="bg-border/80" />
      <div className="flex flex-col gap-3 p-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          Keep this checklist handy as you launch tenants across sandbox and production environments.
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="rounded-full">Stripe-inspired onboarding</Badge>
          <Badge variant="outline" className="rounded-full">Progress saved locally</Badge>
        </div>
      </div>
    </Card>
  );
}

export default TenantSetupAssistant;
