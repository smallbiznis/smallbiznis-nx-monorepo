import type { ReactNode } from 'react';
import type { TenantMetadata } from '@smallbiznis/auth-client';
import { Building2Icon, ShieldCheckIcon } from 'lucide-react';

type TenantHeroProps = {
  tenant: TenantMetadata | null;
  title?: string;
  description?: string;
  highlights?: string[];
  badge?: string;
  footer?: ReactNode;
};

const DEFAULT_HIGHLIGHTS = [
  'Enterprise security monitored 24/7',
  'Multi-tenant separation with rich OAuth provider matrix',
  'SSO and passwordless options managed together',
];

export function TenantHero({ tenant, title, description, highlights, badge, footer }: TenantHeroProps) {
  const resolvedTitle =
    title ?? tenant?.branding?.headline ?? `Modern auth for ${tenant?.name ?? 'every team'}`;
  const resolvedDescription =
    description ??
    tenant?.branding?.subheading ??
    'An enterprise-grade authentication portal that unifies password, OTP, and OAuth flows out of the box.';
  const items = highlights && highlights.length > 0 ? highlights : DEFAULT_HIGHLIGHTS;
  const tenantName = tenant?.name ?? 'Smallbiznis Auth';
  const logoUrl = (tenant?.branding?.logoUrl ?? tenant?.logo_url) as string | undefined;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white shadow-2xl">
      <div className="pointer-events-none absolute inset-y-4 right-6 hidden w-40 rounded-full bg-white/10 blur-2xl lg:block" />
      <div className="relative space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100/80">
          <Building2Icon className="h-3.5 w-3.5" /> {badge ?? 'Enterprise SSO Ready'}
        </span>

        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={tenantName} className="h-12 w-12 rounded-full border border-white/20 object-contain" loading="lazy" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg font-semibold">
              {tenantName.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-200/80">Tenant</p>
            <p className="text-lg font-semibold text-white">{tenantName}</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold leading-tight text-white">{resolvedTitle}</h2>
          <p className="mt-3 text-base text-slate-100/80">{resolvedDescription}</p>
        </div>

        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-100/80">
              <ShieldCheckIcon className="h-4 w-4 text-emerald-300" /> {item}
            </li>
          ))}
        </ul>

        {footer ? <div className="pt-2 text-sm text-slate-100/80">{footer}</div> : null}
      </div>
    </section>
  );
}
