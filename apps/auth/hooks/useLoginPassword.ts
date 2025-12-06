'use client';

import { useCallback, useState } from 'react';
import type { AuthUser, LoginPasswordRequest } from '@/lib/api/types';
import { useAuthContext } from '@/components/providers/auth-provider';
import { mutateSession } from '@/lib/api/session-client';

export function useLoginPassword() {
  const { refresh, setUser } = useAuthContext();
  const [data, setData] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = useCallback(
    async (payload: LoginPasswordRequest) => {
      setLoading(true);
      setError(null);
      try {
        const user =
          (await mutateSession('/api/session/login', payload, 'Unable to sign in, please verify your data.')) ??
          (await refresh());
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
    login,
    reset: () => setData(null),
  };
}
