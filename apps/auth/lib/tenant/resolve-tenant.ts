import { extractTenantIdValue, readTenantFromHeaders } from './context';

const TENANT_HEADER = 'x-tenant-id';

type HeaderLike = {
  get(name: string): string | null;
};

export function resolveTenantIdFromRequest(req: Request): string | null {
  return resolveTenantIdFromHeadersValue(req.headers);
}

export function resolveTenantIdFromHeadersValue(headers: HeaderLike): string | null {
  const normalized = headers instanceof Headers ? headers : new Headers(headers as HeadersInit);
  const context = readTenantFromHeaders(normalized);
  const fromContext = extractTenantIdValue(context);
  if (fromContext) {
    return fromContext;
  }

  const header = normalized.get(TENANT_HEADER);
  if (header?.trim()) {
    return header.trim();
  }

  const host = normalized.get('host');
  if (!host) {
    return null;
  }

  const hostname = host.split(':')[0]?.toLowerCase() ?? '';
  if (!hostname) {
    return null;
  }

  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }

  if (parts.length === 2 && parts[0] !== 'www') {
    return parts[0];
  }

  return null;
}
