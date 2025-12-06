'use server';

import type { LoginFormValues } from './schema';
import { loginSchema } from './schema';
import { createAuthClient } from '@/lib/create-auth-client';
import { persistServerTokens } from '@/lib/auth/token-storage.server';
import { getTranslations } from 'next-intl/server';
import { buildAuthorizePath } from '@/lib/navigation';

export type LoginActionState =
  | {
      status: 'error';
      message?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    }
  | {
      status: 'success';
      authorizeURL: string;
    };

type LoginActionInput = LoginFormValues & { authorizeParams?: string | null };

export async function loginAction(values: LoginActionInput): Promise<LoginActionState> {
  console.log("authorizeParams: ", values.authorizeParams)
  const parsed = loginSchema.safeParse(values);
  const t = await getTranslations('Forms.messages');
  if (!parsed.success) {
    return {
      status: 'error',
      message: t('loginInvalid'),
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const authClient = await createAuthClient();
    const response = await authClient.password.login({
      email: parsed.data.email,
      password: parsed.data.password,
      client_id: parsed.data.client_id,
      scope: parsed.data.scope
    });
    await persistServerTokens(response);

    return {
      status: 'success',
      authorizeURL: buildAuthorizePath(values.authorizeParams),
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : t('loginFailed'),
    };
  }
}
