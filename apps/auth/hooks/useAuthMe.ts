'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AuthUser } from '@/lib/api/types';

export function useAuthMe() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/session/me', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: { accept: 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setUser(null);
          return null;
        }
        const message = await readErrorMessage(response);
        throw new Error(message);
      }

      const json = (await response.json()) as { user?: AuthUser | null };
      const profile = json.user ?? null;
      setUser(profile);
      return profile;
    } catch (err) {
      setUser(null);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    loading,
    error,
    setUser,
    refetch: fetchProfile,
  } as {
    user: AuthUser | null;
    loading: boolean;
    error: unknown;
    setUser: (value: AuthUser | null) => void;
    refetch: () => Promise<AuthUser | null>;
  };
}

async function readErrorMessage(response: Response) {
  const text = await response.text();
  if (!text) {
    return 'Unable to load session';
  }
  try {
    const data = JSON.parse(text) as { error?: string };
    if (data?.error) return data.error;
  } catch {
    /* ignore JSON parse errors */
  }
  return text;
}
