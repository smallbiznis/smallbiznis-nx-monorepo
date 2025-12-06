'use client';

import type { OAuthProviderInfo } from '@smallbiznis/auth-client';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@smallbiznis/ui/button';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@smallbiznis/ui/dialog';

import { ShieldIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createBrowserAuthClient } from '@/lib/create-browser-auth-client';
import { persistPkceState } from '@/lib/auth/pkce-storage.client';
import { FormAlert } from '@/components/auth/form-alert';

type OAuthProviderListProps = {
  providers: OAuthProviderInfo[];
  authorizeParams: string;
  variant?: 'default' | 'stacked';
};

export function OAuthProviderList({ providers, authorizeParams, variant = 'default' }: OAuthProviderListProps) {
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [consentProvider, setConsentProvider] = useState<OAuthProviderInfo | null>(null);
  const t = useTranslations('OAuth');

  const orderedProviders = useMemo(
    () => [...providers].sort((a, b) => a.displayName.localeCompare(b.displayName)),
    [providers]
  );

  const startFlow = useCallback(
    async (provider: OAuthProviderInfo) => {
      if (typeof window === 'undefined') return;
      setPendingProvider(provider.name);
      setError(null);
      try {
        const client = createBrowserAuthClient();
        const redirectUri = `${window.location.origin}/oauth/callback`;
        const tenantId = provider.tenantId != null ? String(provider.tenantId) : undefined;
        const result = await client.oauth.startAuthorization({
          provider: provider.name,
          redirectUri,
          tenantId,
        });

        const statePayload = {
          state: result.state,
          nonce: result.nonce,
          codeVerifier: result.codeVerifier ?? result.code_verifier,
          redirectUri,
          authorizeParams,
          provider: provider.name,
        };

        client.oauth.saveState(statePayload);
        persistPkceState(statePayload);
        window.location.assign(result.authorization_url);
      } catch (err) {
        const message = err instanceof Error ? err.message : t('error');
        setError(message);
      } finally {
        setPendingProvider(null);
      }
    },
    [authorizeParams]
  );

  const handleProviderClick = (provider: OAuthProviderInfo) => {
    if (provider.isFirstParty) {
      void startFlow(provider);
    } else {
      setConsentProvider(provider);
    }
  };

  const handleConsent = () => {
    if (consentProvider) {
      const provider = consentProvider;
      setConsentProvider(null);
      void startFlow(provider);
    }
  };

  return (
    <div className="space-y-3">
      {orderedProviders.map((provider) => (
        <Button
          key={provider.name}
          type="button"
          variant={variant === 'stacked' ? 'outline' : 'outline'}
          className={
            variant === 'stacked'
              ? 'h-11 w-full justify-between rounded-2xl border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50'
              : 'w-full justify-between'
          }
          disabled={pendingProvider === provider.name}
          onClick={() => handleProviderClick(provider)}
        >
          <span className="flex items-center gap-2">
            {provider.iconURL ? (
              <img
                src={provider.iconURL}
                alt={provider.displayName}
                className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                loading="lazy"
              />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                {(provider.displayName ?? provider.name ?? '?').charAt(0).toUpperCase()}
              </span>
            )}
            {provider.displayName ?? provider.name}
          </span>
          <span className="text-xs text-slate-500">
            {pendingProvider === provider.name ? t('loading') : provider.isFirstParty ? t('firstParty') : t('thirdParty')}
          </span>
        </Button>
      ))}

      {error ? <FormAlert variant="error" message={error} /> : null}

      <Dialog open={Boolean(consentProvider)} onOpenChange={(open) => !open && setConsentProvider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldIcon className="h-4 w-4 text-blue-600" /> {t('dialog.title')}
            </DialogTitle>
            <DialogDescription>
              {t('dialog.description', { provider: consentProvider?.displayName ?? 'this provider' })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setConsentProvider(null)}>
              {t('dialog.cancel')}
            </Button>
            <Button onClick={handleConsent}>{t('dialog.confirm')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
