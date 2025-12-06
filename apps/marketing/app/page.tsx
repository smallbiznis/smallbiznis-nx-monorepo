'use client';
/* eslint-disable */
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@smallbiznis/ui';
import {
  ArrowRight,
  Workflow,
  Gift,
  BarChart3,
  Play,
  Zap,
  Cog,
  Rocket,
} from 'lucide-react';

function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  if ((window as any).posthog) (window as any).posthog.capture(name, props);
  if ((window as any).plausible) (window as any).plausible(name, { props });
  if ((window as any).gtag) (window as any).gtag('event', name, props);
}

export default function LandingPage() {
  useEffect(() => {
    trackEvent('page_view', { page: 'landing' });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      {/* ===== HERO ===== */}
      <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Automate. Engage. <span className="text-blue-600">Grow.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
        >
          Build personalized workflows, loyalty programs, and campaigns — all in
          one unified automation platform.
        </motion.p>

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="px-8"
            onClick={() =>
              trackEvent('cta_clicked', {
                location: 'hero',
                action: 'start_free_trial',
              })
            }
          >
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={() =>
              trackEvent('cta_clicked', {
                location: 'hero',
                action: 'watch_demo',
              })
            }
          >
            Watch Demo
          </Button>
        </div>
        <p className="text-sm text-slate-500 mt-3">No credit card required.</p>

        {/* Flow Builder Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-[-80px] w-full flex justify-center"
        >
          <FlowAnimation />
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-32 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: 'Connect Your Data',
                desc: 'Sync user, transaction, and campaign data from your existing systems.',
              },
              {
                icon: Cog,
                title: 'Build Workflows',
                desc: 'Visually design triggers, conditions, and actions that match your business logic.',
              },
              {
                icon: Rocket,
                title: 'Launch and Automate',
                desc: 'Run automations that drive loyalty, engagement, and conversions in real time.',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 mb-6 shadow-sm">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need to automate growth
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Workflow,
                title: 'Visual Workflow Builder',
                desc: 'Design triggers, conditions, and actions visually — like Zapier, but built for your business logic.',
              },
              {
                icon: Gift,
                title: 'Loyalty & Reward Engine',
                desc: 'Create tier-based loyalty programs and reward points automatically for customer engagement.',
              },
              {
                icon: BarChart3,
                title: 'Campaign Automation',
                desc: 'Run scheduled or rule-based marketing campaigns with real-time performance tracking.',
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-sm hover:shadow-md transition"
              >
                <f.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Loved by forward-thinking teams
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                quote:
                  'This automation suite changed how we run campaigns — it saves us hours every week.',
                name: 'Lina K.',
                title: 'Marketing Lead, CoffeeChain',
              },
              {
                quote:
                  'Finally, an automation platform that fits how *our* business actually works.',
                name: 'Aaron P.',
                title: 'CTO, FinPro',
              },
              {
                quote:
                  'It’s like Zapier and Shopify Flow had a child. We love the flexibility.',
                name: 'Mei T.',
                title: 'Founder, StyleHub',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border rounded-2xl p-8 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition"
              >
                <p className="italic text-slate-700 mb-4">“{t.quote}”</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-slate-500">{t.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to build automations that scale?
        </h2>
        <p className="text-lg text-blue-100 mb-10">
          Start connecting your data, campaigns, and loyalty systems today.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-blue-700 hover:bg-blue-100"
          onClick={() =>
            trackEvent('cta_clicked', {
              location: 'bottom',
              action: 'start_free_trial',
            })
          }
        >
          Get Started Free
        </Button>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 text-center text-sm text-slate-500 border-t">
        <p>
          © {new Date().getFullYear()} Automation Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ===== Flow Builder Preview Animation ===== */
function FlowAnimation() {
  const nodes = [
    { text: 'Trigger', color: 'bg-blue-600', delay: 0 },
    { text: 'Condition', color: 'bg-amber-500', delay: 0.3 },
    { text: 'Action', color: 'bg-green-600', delay: 0.6 },
  ];
  return (
    <div className="relative flex items-center justify-center gap-6 mt-16">
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: n.delay, duration: 0.6 }}
          className={`px-6 py-4 rounded-2xl text-white font-medium shadow-lg ${n.color}`}
        >
          {n.text}
        </motion.div>
      ))}

      <motion.svg
        width="320"
        height="60"
        viewBox="0 0 320 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -z-10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.4 }}
      >
        <path
          d="M20 30 H300"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
