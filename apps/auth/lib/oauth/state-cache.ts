import type { OAuthStateRecord } from './types';

export interface OAuthStateCache {
  set(key: string, record: OAuthStateRecord, ttlMs: number): Promise<void>;
  get(key: string): Promise<OAuthStateRecord | null>;
  delete(key: string): Promise<void>;
}

export class InMemoryOAuthStateCache implements OAuthStateCache {
  private static store = new Map<string, { record: OAuthStateRecord; expiresAt: number }>();

  async set(key: string, record: OAuthStateRecord, ttlMs: number): Promise<void> {
    const expiresAt = Date.now() + ttlMs;
    InMemoryOAuthStateCache.store.set(key, { record, expiresAt });
  }

  async get(key: string): Promise<OAuthStateRecord | null> {
    const entry = InMemoryOAuthStateCache.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
      InMemoryOAuthStateCache.store.delete(key);
      return null;
    }
    return entry.record;
  }

  async delete(key: string): Promise<void> {
    InMemoryOAuthStateCache.store.delete(key);
  }
}
