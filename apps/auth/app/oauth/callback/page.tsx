import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@smallbiznis/ui/card'

import { clearPkceStateOnServer, readPkceStateFromRequest } from '@/lib/auth/pkce-storage.server';
import { clearServerTokens, persistServerTokens } from '@/lib/auth/token-storage.server';
import { createAuthClient } from '@/lib/create-auth-client';
import { buildAuthorizePath } from '@/lib/navigation';

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function OAuthCallbackPage({ searchParams }: Props) {
  const code = firstValue(searchParams.code);
  const state = firstValue(searchParams.state);
  const error = firstValue(searchParams.error);

  if (error) {
    await clearPkceStateOnServer();
    await clearServerTokens();
    return <OAuthMessage title="OAuth failed" description={error} variant="error" />;
  }

  if (!code || !state) {
    await clearPkceStateOnServer();
    return <OAuthMessage title="Invalid callback" description="Missing authorization code or state parameter." variant="error" />;
  }

  const storedState = await readPkceStateFromRequest();
  if (!storedState || storedState.state !== state) {
    await clearPkceStateOnServer();
    return <OAuthMessage title="State mismatch" description="PKCE state is missing or does not match." variant="error" />;
  }

  try {
    const authClient = await createAuthClient();
    const tokens = await authClient.oauth.exchangeToken({
      grant_type: 'authorization_code',
      code,
      redirect_uri: storedState.redirectUri,
      code_verifier: storedState.codeVerifier,
    });
    await persistServerTokens(tokens);
    await clearPkceStateOnServer();
    redirect(buildAuthorizePath(storedState.authorizeParams));
  } catch (err) {
    await clearPkceStateOnServer();
    await clearServerTokens();
    const message = err instanceof Error ? err.message : 'Unable to exchange the authorization code.';
    return <OAuthMessage title="Token exchange failed" description={message} variant="error" />;
  }
}

function firstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value ?? '';
}

function OAuthMessage({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant: 'success' | 'error';
}) {
  const Icon = variant === 'success' ? CheckCircleIcon : AlertCircleIcon;
  const color = variant === 'success' ? 'text-green-600' : 'text-red-600';
  const bg = variant === 'success' ? 'bg-green-50' : 'bg-red-50';

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <Card className="w-full max-w-lg border-slate-200">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Icon className={`h-5 w-5 ${color}`} /> {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`${bg} rounded-lg border border-slate-200/60 p-4 text-sm text-slate-600`}>
            This page will automatically redirect you once tokens are stored. If it does not, return to the{' '}
            <Link href="/" className="font-semibold text-blue-600 hover:underline">
              home page
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
