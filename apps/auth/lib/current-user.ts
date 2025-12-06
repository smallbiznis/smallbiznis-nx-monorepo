import { redirect } from 'next/navigation';
import type { AuthUser } from '@smallbiznis/auth-client';
import { createAuthClient } from './create-auth-client';
import { readServerToken } from './auth/token-storage.server';
import { ACCESS_TOKEN_COOKIE } from './auth/token-constants';

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await readServerToken(ACCESS_TOKEN_COOKIE);
  if (!token) {
    return null;
  }

  try {
    const client = await createAuthClient({ token });
    return await client.me();
  } catch {
    return null;
  }
}

export async function redirectIfAuthenticated(destination = '/dashboard') {
  const user = await getCurrentUser();
  if (user) {
    redirect(destination);
  }
}
