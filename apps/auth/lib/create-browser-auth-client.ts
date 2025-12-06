'use client';

import { AuthClient } from '@smallbiznis/auth-client';

export function createBrowserAuthClient() {
  if (typeof window === 'undefined') {
    throw new Error('createBrowserAuthClient can only be used in the browser');
  }
  const baseURL = (process.env.NEXT_PUBLIC_AUTH_API ?? window.location.origin).replace(/\/$/, '');
  return new AuthClient({ baseURL });
}
