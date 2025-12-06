'use server';

import type { ForgotPasswordFormValues } from './schema';
import { forgotPasswordSchema } from './schema';
import { createAuthClient } from '@/lib/create-auth-client';
import { getTranslations } from 'next-intl/server';

export type ForgotPasswordActionState =
  | {
      status: 'error';
      message?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    }
  | {
      status: 'success';
    };

export async function forgotPasswordAction(values: ForgotPasswordFormValues): Promise<ForgotPasswordActionState> {
  const parsed = forgotPasswordSchema.safeParse(values);
  const t = await getTranslations('Forms.messages');
  if (!parsed.success) {
    return {
      status: 'error',
      message: t('forgotInvalid'),
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const authClient = await createAuthClient();
    await authClient.password.forgot({ email: parsed.data.email });
    return { status: 'success' };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : t('forgotFailed'),
    };
  }
}
