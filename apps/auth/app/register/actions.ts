'use server';

import type { RegisterFormValues } from './schema';
import { registerSchema } from './schema';
import { createAuthClient } from '@/lib/create-auth-client';
import { persistServerTokens } from '@/lib/auth/token-storage.server';
import { getTranslations } from 'next-intl/server';
import { buildAuthorizePath } from '@/lib/navigation';

export type RegisterActionState =
  | {
      status: 'error';
      message?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    }
  | {
      status: 'success';
      authorizeURL: string;
    };

type RegisterActionInput = RegisterFormValues & { authorizeParams?: string | null };

export async function registerAction(values: RegisterActionInput): Promise<RegisterActionState> {
  const parsed = registerSchema.safeParse(values);
  const t = await getTranslations('Forms.messages');
  if (!parsed.success) {
    return {
      status: 'error',
      message: t('registerInvalid'),
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const authClient = await createAuthClient();
    const response = await authClient.password.register({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      client_id: parsed.data.client_id
    });

    if (response.access_token && response.refresh_token) {
      await persistServerTokens(response);
    }

    return {
      status: 'success',
      authorizeURL: buildAuthorizePath(values.authorizeParams),
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : t('registerFailed'),
    };
  }
}
