import { PKCE_COOKIE_NAME } from './token-constants';

export type StoredPkceState = {
  state: string;
  nonce?: string;
  codeVerifier?: string;
  redirectUri: string;
  authorizeParams?: string;
  provider?: string;
};

export function encodePkceState(state: StoredPkceState) {
  return encodeURIComponent(JSON.stringify(state));
}

export function decodePkceState(value?: string | null): StoredPkceState | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as StoredPkceState;
  } catch {
    return null;
  }
}

export { PKCE_COOKIE_NAME };
