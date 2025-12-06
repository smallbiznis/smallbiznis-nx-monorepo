const DEFAULT_CODE_VERIFIER_LENGTH = 64;

export type PkcePair = {
  codeVerifier: string;
  codeChallenge: string;
};

export async function createPkcePair(length = DEFAULT_CODE_VERIFIER_LENGTH): Promise<PkcePair> {
  const codeVerifier = generateCodeVerifier(length);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}

export function generateCodeVerifier(length = DEFAULT_CODE_VERIFIER_LENGTH) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const randomValues = new Uint8Array(length);
  getCrypto().getRandomValues(randomValues);
  let result = '';
  for (const value of randomValues) {
    result += charset[value % charset.length];
  }
  return result;
}

export async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await getCrypto().subtle.digest('SHA-256', data);
  return bufferToBase64Url(new Uint8Array(digest));
}

function getCrypto(): Crypto {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error('Crypto API is not available');
}

function bufferToBase64Url(buffer: Uint8Array) {
  let binary = '';
  buffer.forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
