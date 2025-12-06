'use client';

import { useCallback, useState } from 'react';
import type { AuthUser, OTPVerifyPayload } from '@/lib/api/types';
import { useAuthContext } from '@/components/providers/auth-provider';
import { mutateSession } from '@/lib/api/session-client';

export function useOTPVerify() {
  const { refresh, setUser } = useAuthContext();
  const [data, setData] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const verify = useCallback(
    async (payload: OTPVerifyPayload) => {
      setLoading(true);
      setError(null);
      try {
        const user =
          (await mutateSession('/api/session/otp/verify', payload, 'The provided OTP is invalid.')) ?? (await refresh());
        setUser(user ?? null);
        setData(user ?? null);
        return user;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refresh, setUser]
  );

  return {
    data,
    loading,
    error,
    verify,
    reset: () => setData(null),
  };
}
