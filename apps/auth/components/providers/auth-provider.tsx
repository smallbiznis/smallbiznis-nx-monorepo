'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthUser } from '@/lib/api/types';
import { useAuthMe } from '@/hooks/useAuthMe';

export type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  error: unknown;
  refresh: () => Promise<AuthUser | null>;
  setUser: (value: AuthUser | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const { user, loading, error, refetch, setUser } = useAuthMe();

  const logout = useCallback(async () => {
    try {
      await fetch('/api/session/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setUser(null);
    }
  }, [setUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      refresh: refetch,
      setUser,
      logout,
    }),
    [error, loading, logout, refetch, setUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
}
