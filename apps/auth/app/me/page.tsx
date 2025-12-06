import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AuthCard } from '@/components/auth/auth-card';
import { TenantHero } from '@/components/auth/tenant-hero';
import { getCurrentUser } from '@/lib/current-user';
import { getTenantMetadata } from '@/lib/tenant/get-tenant-metadata';

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?redirect=/me');
  }
  const tenant = await getTenantMetadata();
  const t = await getTranslations('Profile');
  const highlights = (t.raw('hero.highlights') as string[]) ?? [];
  const heroFooter = t.rich('hero.footer', {
    link: (chunks) => (
      <Link href="/forgot-password" className="font-semibold text-white underline decoration-white/40">
        {chunks}
      </Link>
    ),
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-2">
        <TenantHero tenant={tenant} title={t('hero.title')} description={t('hero.description')} highlights={highlights} footer={<p>{heroFooter}</p>} />

        <AuthCard title={t('card.title')} description={t('card.description')}>
          <dl className="space-y-3 text-sm">
            <Detail label={t('fields.name')} value={user.name ?? '-'} />
            <Detail label={t('fields.email')} value={user.email} />
            <Detail
              label={t('fields.phone')}
              value={typeof user.phone === 'string' && user.phone.length ? user.phone : '-'}
            />
            <Detail label={t('fields.tenantId')} value={user.tenant_id ? String(user.tenant_id) : '-'} />
            <Detail label={t('fields.userId')} value={String(user.id)} />
          </dl>
        </AuthCard>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-base font-medium text-slate-900">{value}</dd>
    </div>
  );
}
