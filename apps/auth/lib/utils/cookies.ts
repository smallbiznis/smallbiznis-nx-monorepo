export type SameSite = 'lax' | 'strict' | 'none';

export type CookieOptions = {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: SameSite;
};

export function serializeCookie(name: string, value: string, options: CookieOptions = {}) {
  const segments = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge && Number.isFinite(options.maxAge)) {
    segments.push(`Max-Age=${Math.trunc(options.maxAge)}`);
  }
  segments.push(`Path=${options.path ?? '/'}`);
  if (options.sameSite) {
    segments.push(`SameSite=${capitalize(options.sameSite)}`);
  } else {
    segments.push('SameSite=Lax');
  }
  if (options.secure ?? true) {
    segments.push('Secure');
  }
  if (options.httpOnly) {
    segments.push('HttpOnly');
  }
  return segments.join('; ');
}

export function parseCookieHeader(header?: string | null) {
  const result: Record<string, string> = {};
  if (!header) return result;
  const pairs = header.split(';');
  for (const part of pairs) {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) continue;
    result[rawKey] = rest.length ? decodeURIComponent(rest.join('=')) : '';
  }
  return result;
}

export function getCookieValue(header: string | null | undefined, name: string) {
  const parsed = parseCookieHeader(header ?? undefined);
  return parsed[name];
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
