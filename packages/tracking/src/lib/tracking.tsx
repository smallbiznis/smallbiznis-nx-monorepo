
export function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const w = window as any;

  if (w.posthog) w.posthog.capture(name, props);
  if (w.plausible) w.plausible(name, { props });
  if (w.gtag) w.gtag('event', name, props);
}
