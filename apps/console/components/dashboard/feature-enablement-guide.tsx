import { ComponentType, SVGProps } from 'react';
import Link from 'next/link';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import {
  ActivitySquare,
  BellRing,
  Cable,
  ChartBarBig,
  Gauge,
  LineChart,
  Logs,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
}

const features: FeatureCard[] = [
  {
    title: 'Usage-Based Billing',
    description: 'Meter real-time events to charge tenants only for what they consume.',
    href: '/usage',
    icon: LineChart,
    badge: 'Meters',
  },
  {
    title: 'Tiered Pricing',
    description: 'Define graduated price books and ramps for enterprise contract flexibility.',
    href: '/pricing',
    icon: ChartBarBig,
    badge: 'Price books',
  },
  {
    title: 'Subscription Lifecycle',
    description: 'Track activation, renewal, pause, and cancel flows across tenants.',
    href: '/subscriptions',
    icon: Gauge,
  },
  {
    title: 'Automated Invoicing',
    description: 'Generate, deliver, and collect recurring invoices programmatically.',
    href: '/invoices',
    icon: Logs,
  },
  {
    title: 'Quota & Rate Limit Monitoring',
    description: 'Visualize quota burn-down and enforce limits through metering.',
    href: '/usage',
    icon: ActivitySquare,
  },
  {
    title: 'Webhook Delivery Logs',
    description: 'Replay failed deliveries and monitor endpoint health with signatures.',
    href: '/webhooks',
    icon: Cable,
  },
  {
    title: 'Customer Management',
    description: 'Operate customer records, contacts, and billing alignment in one place.',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'API Integration (usage ingestion)',
    description: 'Send metered usage via API collectors to back your billing data plane.',
    href: '/usage',
    icon: ShieldCheck,
  },
  {
    title: 'Rating & Metering Engine',
    description: 'Apply billing logic across products, prices, and dimensions per event.',
    href: '/pricing',
    icon: BellRing,
  },
];

export function FeatureEnablementGuide() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Feature Enablement Guide</CardTitle>
          <CardDescription>
            Explore core SmallBiznis capabilities with quick entry points to each surface area.
          </CardDescription>
        </div>
        <Badge variant="secondary">Enterprise onboarding</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full border-muted bg-muted/30 shadow-none">
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold leading-tight">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
                {feature.badge ? <Badge variant="outline">{feature.badge}</Badge> : null}
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Button asChild size="sm" className="gap-1">
                  <Link href={feature.href}>
                    Open
                    <Gauge className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="link" size="sm" className="text-primary/80">
                  <Link href="#">Explore</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default FeatureEnablementGuide;
