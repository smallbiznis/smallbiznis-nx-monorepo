import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { SearchParams } from '@/lib/search-params';
import { readSearchParam } from '@/lib/search-params';
import { getTenantMetadata } from '@/lib/tenant/get-tenant-metadata';

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function OAuthErrorPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const errorCode = readSearchParam(resolved?.error) ?? 'invalid_request';
  const description = readSearchParam(resolved?.error_description) ?? 'The OAuth request could not be processed.';
  const tenant = await getTenantMetadata();
  const t = await getTranslations('OAuthError');

  return (
    <div className="min-h-screen bg-slate-100 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.2),_transparent_45%)] px-4 py-16">
      <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/60 lg:flex lg:items-stretch">
        {/* <section className="flex-1 rounded-[28px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{t('hero.badge', { defaultValue: 'Enterprise SSO Ready' })}</p>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-200/80">{t('hero.tenantLabel', { defaultValue: 'Tenant' })}</p>
              <p className="text-lg font-semibold text-white">{tenant?.name ?? 'Workspace'}</p>
            </div>
            <h1 className="text-2xl font-semibold">{t('hero.title')}</h1>
            <p className="text-sm text-slate-100/80">{t('hero.description')}</p>
            <ul className="space-y-2 text-sm text-slate-100/80">
              {(t.raw('hero.highlights') as string[]).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="pt-2 text-sm">
              {t.rich('hero.footer', {
                home: (chunks) => (
                  <Link href="/" className="font-semibold text-white underline decoration-white/40">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </section> */}
        <section className="flex-1 space-y-6 p-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{t('card.title')}</h2>
            <p className="text-sm text-slate-500">{t('card.description')}</p>
          </div>
          <dl className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">{t('card.errorCode')}</dt>
              <dd className="font-semibold text-slate-900">{errorCode}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">{t('card.descriptionLabel')}</dt>
              <dd className="text-slate-800">{decodeURIComponent(description)}</dd>
            </div>
          </dl>
          {/* <div className="flex flex-col gap-3 pt-2 text-sm text-slate-500">
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
              {t('actions.signIn')}
            </Link>
            <Link href="/" className="font-semibold text-blue-600 hover:underline">
              {t('actions.home')}
            </Link>
          </div> */}
        </section>
      </div>
    </div>
  );
}
