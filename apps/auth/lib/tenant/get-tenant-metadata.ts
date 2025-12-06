import { cache } from 'react';
import type { TenantMetadata } from '@smallbiznis/auth-client';
import { createAuthClient } from '../create-auth-client';

export const getTenantMetadata = cache(async (): Promise<TenantMetadata | null> => {
  try {
    const client = await createAuthClient();
    return await client.getTenantMetadata();
  } catch (error) {
    console.error('Unable to load tenant metadata', error);
    return null;
  }
});
