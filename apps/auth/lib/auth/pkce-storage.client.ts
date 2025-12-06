'use client';

import { PKCE_COOKIE_NAME, PKCE_COOKIE_MAX_AGE } from './token-constants';
import { decodePkceState, encodePkceState, type StoredPkceState } from './pkce-storage';
import { serializeCookie, getCookieValue } from '../utils/cookies';

export function persistPkceState(state: StoredPkceState) {
  if (typeof document === 'undefined') return;
  document.cookie = serializeCookie(PKCE_COOKIE_NAME, encodePkceState(state), {
    maxAge: PKCE_COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: true,
    path: '/',
  });
}

export function readPkceStateFromBrowser() {
  if (typeof document === 'undefined') return null;
  const value = getCookieValue(document.cookie, PKCE_COOKIE_NAME);
  return decodePkceState(value ?? undefined);
}

export function clearBrowserPkceState() {
  if (typeof document === 'undefined') return;
  document.cookie = serializeCookie(PKCE_COOKIE_NAME, '', {
    maxAge: 0,
    path: '/',
  });
}
