import type { OAuthProviderInfo } from '@smallbiznis/auth-client';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { OAuthProviderList } from './oauth-provider-list';
import { createAuthClient } from '@/lib/create-auth-client';
import { resolveTenantIdFromHeadersValue } from '@/lib/tenant/resolve-tenant';

type Props = {
  authorizeParams: string;
  variant?: 'default' | 'stacked';
  heading?: string;
};

export async function OAuthProviderSection({ authorizeParams, variant = 'default', heading }: Props) {
  const headerStore = await headers();
  const tenantId = resolveTenantIdFromHeadersValue(headerStore);
  const t = await getTranslations('OAuth');
  let providers: OAuthProviderInfo[] = [];
  try {
    const client = await createAuthClient();
    providers = await client.oauth.listProviders({ tenantId: tenantId ?? undefined });
  } catch (error) {
    console.error('Unable to load OAuth providers', error);
    return null;
  }

  if (!providers.length) {
    return null;
  }

  if (variant === 'stacked') {
    return <OAuthProviderList providers={providers} authorizeParams={authorizeParams} variant="stacked" />;
  }

  return (
    <section className="mt-8 space-y-3">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        {heading ?? t('listTitle')}
      </p>
      <OAuthProviderList providers={providers} authorizeParams={authorizeParams} />
    </section>
  );
}
