'use server';

import type { OtpFormValues } from './schema';
import { otpSchema } from './schema';
import { createAuthClient } from '@/lib/create-auth-client';
import { persistServerTokens } from '@/lib/auth/token-storage.server';
import { getTranslations } from 'next-intl/server';
import { buildAuthorizePath } from '@/lib/navigation';

export type OtpActionState =
  | {
      status: 'error';
      message?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    }
  | {
      status: 'success';
      authorizeURL: string;
    };

type OtpActionInput = OtpFormValues & { authorizeParams?: string | null };

export async function verifyOtpAction(values: OtpActionInput): Promise<OtpActionState> {
  const parsed = otpSchema.safeParse(values);
  const t = await getTranslations('Forms.messages');
  if (!parsed.success) {
    return {
      status: 'error',
      message: t('otpInvalid'),
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const authClient = await createAuthClient();
    const response = await authClient.password.verifyOtp({
      email: parsed.data.email,
      otp: parsed.data.otp,
    });
    await persistServerTokens(response);
    return {
      status: 'success',
      authorizeURL: buildAuthorizePath(values.authorizeParams),
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : t('otpFailed'),
    };
  }
}
