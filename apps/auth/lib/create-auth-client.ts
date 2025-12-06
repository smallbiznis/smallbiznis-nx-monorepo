import { AuthClient } from '@smallbiznis/auth-client';
import { headers } from 'next/headers';

type CreateAuthClientOptions = {
  token?: string | null;
};

const DEFAULT_AUTH_BASE_URL =
  process.env.AUTH_INTERNAL_URL?.replace(/\/$/, '') ??
  process.env.NEXT_PUBLIC_AUTH_API?.replace(/\/$/, '') ??
  'http://auth-api';

export async function createAuthClient(options: CreateAuthClientOptions = {}) {
  const headerStore = await headers();
  const tenantId = headerStore.get('x-tenant-id') ?? undefined;
  const defaultHeaders: HeadersInit = {};

  if (tenantId) {
    defaultHeaders['x-tenant-id'] = tenantId;
  }

  if (options.token) {
    defaultHeaders.Authorization = `Bearer ${options.token}`;
  }

  return new AuthClient({
    baseURL: DEFAULT_AUTH_BASE_URL,
    defaultHeaders: Object.keys(defaultHeaders).length ? defaultHeaders : undefined,
  });
}
