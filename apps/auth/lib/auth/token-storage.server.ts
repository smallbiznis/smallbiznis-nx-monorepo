import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE,
  TOKEN_COOKIE_PATH,
} from './token-constants';
import type { TokenResponse } from '../api/types';

export async function persistServerTokens(response: TokenResponse) {
  if (!response.access_token || !response.refresh_token) {
    throw new Error('access_token and refresh_token are required');
  }
  const cookieStore = await cookies();
  cookieStore.set({
    name: ACCESS_TOKEN_COOKIE,
    value: response.access_token,
    domain: '.smallbiznisapp.io',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: TOKEN_COOKIE_PATH,
    maxAge: response.expires_in ?? ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set({
    name: REFRESH_TOKEN_COOKIE,
    value: response.refresh_token,
    domain: '.smallbiznisapp.io',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: TOKEN_COOKIE_PATH,
    maxAge: response.refresh_expires_in ?? REFRESH_TOKEN_MAX_AGE,
  });
}

export async function readServerToken(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
}

export async function clearServerTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}
