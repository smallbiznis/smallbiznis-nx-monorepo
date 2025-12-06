import { randomBytes } from 'node:crypto';
import { createPkcePair } from '../auth/pkce';
import { OAuthProviderStore } from './provider-store';
import { OAuthStateCache } from './state-cache';
import type {
  OAuthAuthorizationRequest,
  OAuthAuthorizationResult,
  OAuthProviderSummary,
} from './types';

const DEFAULT_SCOPES = ['openid', 'profile', 'email'];
const STATE_TTL_MS = 5 * 60 * 1000;
const STATE_CACHE_PREFIX = 'oauth:state:';

export class BadRequestError extends Error {}
export class NotFoundError extends Error {}

export class OAuthService {
  constructor(private readonly providerStore: OAuthProviderStore, private readonly stateCache: OAuthStateCache) {}

  async listProviders(tenantId: string): Promise<OAuthProviderSummary[]> {
    const providers = await this.providerStore.getProviders(tenantId);
    if (!providers.length) {
      throw new NotFoundError('No OAuth providers configured for this tenant.');
    }
    return providers.map((provider) => ({
      name: provider.name,
      displayName: provider.displayName,
      iconURL: provider.iconURL,
      authURL: provider.authorizationURL,
      tenantId,
      isFirstParty: provider.isFirstParty ?? false,
    }));
  }

  async startAuthorization(
    tenantId: string,
    payload: OAuthAuthorizationRequest
  ): Promise<OAuthAuthorizationResult> {
    if (!payload.provider) {
      throw new BadRequestError('Parameter "provider" is required.');
    }
    if (!payload.redirectUri) {
      throw new BadRequestError('Parameter "redirect_uri" is required.');
    }

    const provider = await this.providerStore.getProvider(tenantId, payload.provider);
    if (!provider) {
      throw new NotFoundError('The requested provider could not be found.');
    }

    const scopes = this.normalizeScopes(payload.scope, provider.defaultScopes);
    const pkce = await createPkcePair();
    const state = this.generateToken(32);
    const nonce = this.generateToken(24);
    const authorizationUrl = this.buildAuthorizationUrl(provider.authorizationURL, {
      client_id: provider.clientId,
      redirect_uri: payload.redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      state,
      nonce,
      code_challenge: pkce.codeChallenge,
      code_challenge_method: 'S256',
      ...(provider.extraParams ?? {}),
    });

    await this.stateCache.set(
      `${STATE_CACHE_PREFIX}${state}`,
      {
        tenantId,
        provider: provider.name,
        nonce,
        codeVerifier: pkce.codeVerifier,
        redirectUri: payload.redirectUri,
        createdAt: Date.now(),
      },
      STATE_TTL_MS
    );

    return {
      authorizationUrl,
      state,
      nonce,
      codeVerifier: pkce.codeVerifier,
    };
  }

  private normalizeScopes(
    scope: string[] | undefined,
    defaultScopes?: string[]
  ) {
    const normalized = scope?.map((value) => value.trim()).filter(Boolean) ?? [];
    if (normalized.length) {
      return normalized;
    }
    if (defaultScopes?.length) {
      return defaultScopes;
    }
    return DEFAULT_SCOPES;
  }

  private buildAuthorizationUrl(base: string, params: Record<string, string | undefined>) {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }
      url.searchParams.set(key, value);
    });
    return url.toString();
  }

  private generateToken(length: number) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint8Array(length);
    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(randomValues);
    } else {
      const bytes = randomBytes(length);
      bytes.forEach((value, index) => {
        randomValues[index] = value;
      });
    }
    let result = '';
    randomValues.forEach((value) => {
      result += charset[value % charset.length];
    });
    return result;
  }
}
