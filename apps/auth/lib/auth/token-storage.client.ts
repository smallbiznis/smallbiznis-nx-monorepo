'use client';

import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE,
  TOKEN_COOKIE_PATH,
} from './token-constants';
import type { TokenResponse } from '../api/types';
import { serializeCookie, getCookieValue } from '../utils/cookies';

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return;
  document.cookie = serializeCookie(name, value, {
    maxAge,
    path: TOKEN_COOKIE_PATH,
    sameSite: 'lax',
    secure: true,
  });
}

export function persistBrowserTokens(response: TokenResponse) {
  if (!response.access_token || !response.refresh_token) {
    throw new Error('access_token and refresh_token are required');
  }
  setCookie(ACCESS_TOKEN_COOKIE, response.access_token, response.expires_in ?? ACCESS_TOKEN_MAX_AGE);
  setCookie(
    REFRESH_TOKEN_COOKIE,
    response.refresh_token,
    response.refresh_expires_in ?? REFRESH_TOKEN_MAX_AGE
  );
}

export function clearBrowserTokens() {
  if (typeof document === 'undefined') return;
  document.cookie = serializeCookie(ACCESS_TOKEN_COOKIE, '', {
    maxAge: 0,
    path: TOKEN_COOKIE_PATH,
    sameSite: 'lax',
  });
  document.cookie = serializeCookie(REFRESH_TOKEN_COOKIE, '', {
    maxAge: 0,
    path: TOKEN_COOKIE_PATH,
    sameSite: 'lax',
  });
}

export function getBrowserAccessToken() {
  if (typeof document === 'undefined') return null;
  return getCookieValue(document.cookie, ACCESS_TOKEN_COOKIE) ?? null;
}

export function getBrowserRefreshToken() {
  if (typeof document === 'undefined') return null;
  return getCookieValue(document.cookie, REFRESH_TOKEN_COOKIE) ?? null;
}
