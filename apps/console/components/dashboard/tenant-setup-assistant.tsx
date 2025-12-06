'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardDescription, CardTitle } from '@smallbiznis/ui/card';
import { Progress } from '@smallbiznis/ui/progress';
import { Separator } from '@smallbiznis/ui/separator';
import { cn } from '@smallbiznis/ui/utils';
import { ArrowUpRight, Check, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-muted/30 p-4 md:p-8">
      <Card className="overflow-hidden rounded-3xl border border-border/80 shadow-sm">
        <div className="space-y-8 p-8">
          <div className="space-y-3">
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">Tenant Setup Assistant</CardTitle>
            <CardDescription className="max-w-xl text-sm text-muted-foreground">
              Activate your SmallBiznis billing environment with guided, enterprise-ready tasks.
            </CardDescription>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm font-medium text-foreground">
              <span>Progress</span>
              <span className="ml-auto text-sm font-semibold">{completionPercent}%</span>
            </div>
            <Progress value={completionPercent} aria-label="Tenant setup completion" className="h-2" />
            <p className="text-xs text-muted-foreground">{completedSteps} of {steps.length} steps completed</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Setup checklist</p>
              <p className="text-sm text-muted-foreground">
                Complete each step to finalize your tenant billing workspace.
              </p>
            </div>

            <div className="space-y-0">
              {steps.map((step, index) => {
                const status = progress[step.id] ?? 'pending';
                const meta = statusCopy[status];

                return (
                  <div key={step.id}>
                    <div className="flex flex-col gap-4 px-4 py-6 md:flex-row md:items-start md:justify-between">
                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                          <Badge variant={meta.badge} className="rounded-full px-2.5 py-0.5 text-xs">
                            {meta.label}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-base font-medium text-foreground">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>

                      <div className="flex w-full flex-col items-end gap-2 md:w-auto">
                        <Button
                          className="bg-indigo-600 px-4 text-white shadow-sm hover:bg-indigo-500"
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
                          className={cn('text-sm text-muted-foreground hover:text-foreground', {
                            'text-primary': status === 'completed',
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
                    {index < steps.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TenantSetupAssistant;
