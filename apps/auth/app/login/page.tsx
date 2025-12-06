import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { SearchParams } from '@/lib/search-params';
import { buildAuthorizeParams, readSearchParam } from '@/lib/search-params';
import { OAuthProviderSection } from '@/components/oauth/oauth-provider-section';
import { getTenantMetadata } from '@/lib/tenant/get-tenant-metadata';
import { getCurrentUser } from '@/lib/current-user';
import { buildAuthorizePath } from '@/lib/navigation';
import { LoginForm } from './login-form';

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const authorizeParams = buildAuthorizeParams(resolvedSearchParams);
  const query = authorizeParams ? `?${authorizeParams}` : '';
  const clientId = readSearchParam(resolvedSearchParams?.client_id);
  const scope = readSearchParam(resolvedSearchParams?.scope);
  const tenant = await getTenantMetadata();
  const tenantName = tenant?.name ?? 'Workspace';
  const t = await getTranslations('Login');
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect(buildAuthorizePath(authorizeParams));
  }

  return (
    <div className="min-h-screen bg-slate-100 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.2),_transparent_45%)] px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/60">
          <div className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
            <Link
              href={`/login${query}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-slate-900 shadow-sm"
            >
              {t('tabs.login')}
            </Link>
            <Link
              href={`/register${query}`}
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-slate-400 transition hover:text-slate-700"
            >
              {t('tabs.register')}
            </Link>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-slate-400">{tenantName}</p>
              <h1 className="mt-2 text-xl font-semibold text-slate-900">{t('card.title')}</h1>
              <p className="text-sm text-slate-500">{t('card.subtitle')}</p>
            </div>

            <OAuthProviderSection authorizeParams={authorizeParams} variant="stacked" />

            <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              {t('divider')}
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <LoginForm authorizeParams={authorizeParams} clientId={clientId} scope={scope} />

            <p className="text-center text-sm text-slate-500">
              {t('footerText')}{' '}
              <Link href={`/register${query}`} className="font-semibold text-slate-900 hover:underline">
                {t('footerLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
