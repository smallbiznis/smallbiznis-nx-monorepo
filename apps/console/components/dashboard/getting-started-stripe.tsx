'use client';

import { type ElementType } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Badge } from '@smallbiznis/ui/badge';
import { Button } from '@smallbiznis/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@smallbiznis/ui/card';
import { BookOpen, Boxes, Code, Gauge, Layers, Signal, TerminalSquare, Wand2 } from 'lucide-react';

type ActionCard = {
  title: string;
  description: string;
  href: string;
  secondary?: string;
  icon: ElementType;
};

const cards: ActionCard[] = [
  {
    title: 'Create Product Catalog',
    description: 'Model billable offerings and attach pricing definitions for subscriptions and usage-based charges.',
    href: '/products',
    secondary: 'View docs',
    icon: Boxes,
  },
  {
    title: 'Define Usage Meters',
    description: 'Track measurable events such as API calls, seats, or GB transferred.',
    href: '/meters',
    secondary: 'Metering guide',
    icon: Gauge,
  },
  {
    title: 'Configure Pricing Models',
    description: 'Set up flat, tiered, or usage-based pricing for your products.',
    href: '/pricing',
    secondary: 'Pricing patterns',
    icon: Layers,
  },
  {
    title: 'Integrate Usage Ingestion',
    description: 'Send usage events from your backend using the collectors API.',
    href: '/api-keys',
    secondary: 'View API keys',
    icon: Signal,
  },
];

const codeSample = `curl -X POST https://api.smallbiznis.dev/v1/usage \\
  -H "Authorization: Bearer sk_test_***" \\
  -H "Content-Type: application/json" \\
  -d '{
    "meter": "api_calls",
    "value": 1200,
    "customer": "tenant-123",
    "timestamp": 1718059000
  }'`;

export function GettingStartedStripe() {
  const router = useRouter();

  return (
    <section className="space-y-4 rounded-3xl bg-muted/40 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Guides</p>
          <h2 className="text-2xl font-semibold text-foreground">Getting Started</h2>
          <p className="text-sm text-muted-foreground">
            Develop products, define meters, and integrate billing into your application.
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full">Stripe-inspired quickstart</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <Card
                key={card.title}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-foreground">{card.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{card.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-primary/50 text-primary hover:bg-primary/10"
                    onClick={() => router.push(card.href)}
                  >
                    Open {card.title.split(' ')[0]}
                  </Button>
                  {card.secondary ? (
                    <Link
                      href={card.href}
                      className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {card.secondary}
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="flex h-full flex-col justify-between rounded-2xl border border-primary/20 bg-gradient-to-b from-background via-primary/5 to-background shadow-md">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="rounded-full">For developers</Badge>
              <Code className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg font-semibold text-foreground">Use the collectors API</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Send usage directly from your backend with signed requests. Rotate keys per environment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-black p-4 font-mono text-xs text-white shadow-inner">
              <pre className="whitespace-pre-wrap text-left">{codeSample}</pre>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <TerminalSquare className="h-4 w-4 text-primary" />
                <span>Publishable key</span>
                <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary">
                  pk_live_***
                </Badge>
              </div>
              <Link href="/api-keys" className="font-medium text-primary hover:underline">
                View API keys
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[{ icon: BookOpen, label: 'Docs' }, { icon: Wand2, label: 'Templates' }, { icon: Code, label: 'API status' }].map(
          (item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-dashed border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                  <item.icon className="h-4 w-4 text-primary" />
                </span>
                <p className="font-medium text-foreground">{item.label}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link href="/docs">Open</Link>
              </Button>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export default GettingStartedStripe;
