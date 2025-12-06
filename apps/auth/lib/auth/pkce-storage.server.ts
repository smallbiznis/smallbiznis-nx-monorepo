import { cookies } from 'next/headers';
import { PKCE_COOKIE_NAME, PKCE_COOKIE_MAX_AGE } from './token-constants';
import { decodePkceState, encodePkceState, type StoredPkceState } from './pkce-storage';

export async function readPkceStateFromRequest() {
  const cookieStore = await cookies();
  const value = cookieStore.get(PKCE_COOKIE_NAME)?.value;
  return decodePkceState(value ?? undefined);
}

export async function writePkceStateOnServer(state: StoredPkceState) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: PKCE_COOKIE_NAME,
    value: encodePkceState(state),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: PKCE_COOKIE_MAX_AGE,
  });
}

export async function clearPkceStateOnServer() {
  const cookieStore = await cookies();
  cookieStore.delete(PKCE_COOKIE_NAME);
}
