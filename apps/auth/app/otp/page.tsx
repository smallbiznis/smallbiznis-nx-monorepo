import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { SearchParams } from '@/lib/search-params';
import { buildAuthorizeParams, readSearchParam } from '@/lib/search-params';
import { redirectIfAuthenticated } from '@/lib/current-user';
import { AuthCard } from '@/components/auth/auth-card';
import { TenantHero } from '@/components/auth/tenant-hero';
import { UniversalAuthShell } from '@/components/auth/universal-auth-shell';
import { getTenantMetadata } from '@/lib/tenant/get-tenant-metadata';
import { OtpForm } from './otp-form';

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function OtpPage({ searchParams }: PageProps) {
  await redirectIfAuthenticated('/dashboard');
  const resolvedSearchParams = await searchParams;
  const authorizeParams = buildAuthorizeParams(resolvedSearchParams);
  const query = authorizeParams ? `?${authorizeParams}` : '';
  const email = readSearchParam(resolvedSearchParams?.email) ?? undefined;
  const clientId = readSearchParam(resolvedSearchParams?.client_id);
  const tenant = await getTenantMetadata();
  const t = await getTranslations('Otp');
  const highlights = (t.raw('hero.highlights') as string[]) ?? [];
  const heroFooter = t.rich('hero.footer', {
    link: (chunks) => (
      <Link href={`/forgot-password${query}`} className="font-semibold text-white underline decoration-white/40">
        {chunks}
      </Link>
    ),
  });
  const tips = (t.raw('tips.items') as string[]) ?? [];

  return (
    <UniversalAuthShell
      hero={
        <TenantHero
          tenant={tenant}
          title={t('hero.title')}
          description={t('hero.description')}
          highlights={highlights}
          footer={<p>{heroFooter}</p>}
        />
      }
      rightClassName="bg-slate-50"
    >
      <AuthCard
        title={t('card.title')}
        description={t('card.description')}
        footer={
          <p className="text-sm text-slate-500">
            {t('footer.text')}{' '}
            <Link href={`/forgot-password${query}`} className="font-medium text-blue-600 hover:underline">
              {t('footer.link')}
            </Link>
          </p>
        }
      >
        <OtpForm email={email} authorizeParams={authorizeParams} clientId={clientId} />
      </AuthCard>

      <AuthCard title={t('tips.title')} description="">
        <ul className="space-y-2 text-sm text-slate-600">
          {tips.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      </AuthCard>
    </UniversalAuthShell>
  );
}
