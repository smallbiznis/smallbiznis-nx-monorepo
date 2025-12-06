import type { OAuthProviderConfig, TenantOAuthConfig } from './types';

export interface OAuthProviderStore {
  getProviders(tenantId: string): Promise<OAuthProviderConfig[]>;
  getProvider(tenantId: string, name: string): Promise<OAuthProviderConfig | null>;
}

const ENV_CONFIG_KEY = 'AUTH_OAUTH_PROVIDERS';

type EnvProviderConfig = Record<
  string,
  Array<
    OAuthProviderConfig & {
      defaultScopes?: string[];
    }
  >
>;

export class EnvOAuthProviderStore implements OAuthProviderStore {
  private readonly providersByTenant: Map<string, OAuthProviderConfig[]>;

  constructor(source?: string) {
    this.providersByTenant = this.parse(source ?? process.env[ENV_CONFIG_KEY]);
  }

  async getProviders(tenantId: string): Promise<OAuthProviderConfig[]> {
    return this.providersByTenant.get(tenantId) ?? [];
  }

  async getProvider(tenantId: string, name: string): Promise<OAuthProviderConfig | null> {
    const providers = await this.getProviders(tenantId);
    return providers.find((provider) => provider.name === name) ?? null;
  }

  private parse(raw?: string): Map<string, OAuthProviderConfig[]> {
    if (!raw) {
      return new Map();
    }

    try {
      const parsed = JSON.parse(raw) as EnvProviderConfig | TenantOAuthConfig[];
      if (Array.isArray(parsed)) {
        return this.fromArray(parsed);
      }

      return this.fromRecord(parsed);
    } catch (error) {
      console.error('Failed to parse AUTH_OAUTH_PROVIDERS config', error);
      return new Map();
    }
  }

  private fromRecord(record: EnvProviderConfig): Map<string, OAuthProviderConfig[]> {
    const map = new Map<string, OAuthProviderConfig[]>();
    Object.entries(record).forEach(([tenantId, providers]) => {
      if (!Array.isArray(providers)) return;
      map.set(tenantId, providers.map((provider) => this.normalizeProvider(provider)));
    });
    return map;
  }

  private fromArray(configs: TenantOAuthConfig[]): Map<string, OAuthProviderConfig[]> {
    const map = new Map<string, OAuthProviderConfig[]>();
    configs.forEach((config) => {
      if (!config?.tenantId || !Array.isArray(config.providers)) return;
      map.set(
        config.tenantId,
        config.providers.map((provider) => this.normalizeProvider(provider))
      );
    });
    return map;
  }

  private normalizeProvider(provider: OAuthProviderConfig): OAuthProviderConfig {
    return {
      name: provider.name,
      displayName: provider.displayName ?? provider.name,
      iconURL: provider.iconURL,
      authorizationURL: provider.authorizationURL,
      clientId: provider.clientId,
      defaultScopes: provider.defaultScopes?.length ? provider.defaultScopes : undefined,
      extraParams: provider.extraParams,
      isFirstParty: provider.isFirstParty,
    };
  }
}
