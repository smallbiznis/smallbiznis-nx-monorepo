import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { SearchParams } from '@/lib/search-params';
import { buildAuthorizeParams, readSearchParam } from '@/lib/search-params';
import { AuthCard } from '@/components/auth/auth-card';
import { getTenantMetadata } from '@/lib/tenant/get-tenant-metadata';
import { TenantHero } from '@/components/auth/tenant-hero';
import { UniversalAuthShell } from '@/components/auth/universal-auth-shell';
import { ForgotPasswordForm } from './forgot-password-form';

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const authorizeParams = buildAuthorizeParams(resolvedSearchParams);
  const clientId = readSearchParam(resolvedSearchParams?.client_id);
  const query = authorizeParams ? `?${authorizeParams}` : '';
  const tenant = await getTenantMetadata();
  const t = await getTranslations('ForgotPassword');
  const highlights = (t.raw('hero.highlights') as string[]) ?? [];

  return (
    <UniversalAuthShell
      hero={
        <TenantHero
          tenant={tenant}
          title={t('hero.title')}
          description={t('hero.description')}
          highlights={highlights}
        />
      }
    >
      <AuthCard
        title={t('card.title')}
        description={t('card.description')}
        footer={
            <p className="text-sm text-slate-500">
              {t('footer.remembered')}{' '}
              <Link href={`/login${query}`} className="font-medium text-blue-600 hover:underline">
                {t('footer.login')}
              </Link>
            </p>
        }
      >
        <ForgotPasswordForm clientId={clientId}  />
      </AuthCard>
    </UniversalAuthShell>
  );
}
