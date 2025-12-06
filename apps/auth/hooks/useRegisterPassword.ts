'use client';

import { useCallback, useState } from 'react';
import type { AuthUser, RegisterPasswordRequest } from '@/lib/api/types';
import { useAuthContext } from '@/components/providers/auth-provider';
import { mutateSession } from '@/lib/api/session-client';

export function useRegisterPassword() {
  const { refresh, setUser } = useAuthContext();
  const [data, setData] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const register = useCallback(
    async (payload: RegisterPasswordRequest) => {
      setLoading(true);
      setError(null);
      try {
        const user =
          (await mutateSession('/api/session/register', payload, 'Registrasi gagal, coba lagi.')) ??
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
    register,
    reset: () => setData(null),
  };
}
