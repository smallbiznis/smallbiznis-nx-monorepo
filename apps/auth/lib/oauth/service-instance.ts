import { EnvOAuthProviderStore } from './provider-store';
import { InMemoryOAuthStateCache } from './state-cache';
import { OAuthService } from './service';

const providerStore = new EnvOAuthProviderStore();
const stateCache = new InMemoryOAuthStateCache();

export const oauthService = new OAuthService(providerStore, stateCache);
