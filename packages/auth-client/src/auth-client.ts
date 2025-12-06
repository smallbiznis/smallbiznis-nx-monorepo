import type {
  AuthenticatedResponse,
  AuthUser,
  ForgotPasswordPayload,
  LoginWithPasswordPayload,
  OAuthCallbackParams,
  OAuthProviderInfo,
  OAuthStartResponse,
  OAuthStatePayload,
  OAuthTokenRequest,
  RegisterWithPasswordPayload,
  TenantMetadata,
  TokenIntrospectionResponse,
  UserInfoResponse,
  VerifyPasswordOtpPayload,
} from './types';

export type AuthClientOptions = {
  baseURL: string;
  defaultHeaders?: HeadersInit;
  fetchImpl?: typeof fetch;
};

const JSON_CONTENT_TYPE = 'application/json';
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';
const OAUTH_STATE_PREFIX = 'sb.oauth.state.';

type ListProvidersOptions = {
  tenantId?: string;
};

type StartAuthorizationOptions = {
  provider: string;
  redirectUri: string;
  scope?: string[];
  tenantId?: string;
};

type ExchangeTokenOptions = OAuthTokenRequest & {
  tenantId?: string;
};

export class AuthClientError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'AuthClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class AuthClient {
  private readonly baseURL: string;
  private readonly defaultHeaders?: HeadersInit;
  private readonly fetchImpl: typeof fetch;
  private static oauthStateCache = new Map<string, OAuthStatePayload>();

  constructor(options: AuthClientOptions) {
    if (!options?.baseURL) {
      throw new Error('baseURL is required');
    }
    this.baseURL = options.baseURL.replace(/\/$/, '');
    this.defaultHeaders = options.defaultHeaders;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  public password = {
    register: (payload: RegisterWithPasswordPayload) => this.registerWithPassword(payload),
    login: (payload: LoginWithPasswordPayload) => this.loginWithPassword(payload),
    forgot: (payload: ForgotPasswordPayload) => this.forgotPassword(payload),
    verifyOtp: (payload: VerifyPasswordOtpPayload) => this.verifyPasswordOtp(payload),
  };

  public oauth = {
    listProviders: (options?: ListProvidersOptions) => this.listOAuthProviders(options),
    startAuthorization: (options: StartAuthorizationOptions) => this.startOAuthAuthorization(options),
    exchangeToken: (payload: ExchangeTokenOptions) => this.exchangeOAuthToken(payload),
    handleCallback: (search?: string) => AuthClient.parseOAuthCallback(search),
    introspectToken: (token: string) => this.introspectTokenRequest(token),
    revokeToken: (token: string) => this.revokeTokenRequest(token),
    getUserInfo: (token: string) => this.fetchUserInfo(token),
    saveState: (payload: OAuthStatePayload) => AuthClient.saveOAuthState(payload),
    readState: (state?: string) => AuthClient.readOAuthState(state),
    clearState: (state?: string) => AuthClient.clearOAuthState(state),
  };

  public me(token?: string | null) {
    return this.request<AuthUser>('/auth/me', {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  public getTenantMetadata(options?: { tenantId?: string }) {
    return this.request<TenantMetadata>('/.well-known/tenant', {
      method: 'GET',
      headers: this.buildTenantHeaders(options?.tenantId),
    });
  }

  private registerWithPassword(payload: RegisterWithPasswordPayload) {
    return this.request<AuthenticatedResponse>('/auth/password/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  private loginWithPassword(payload: LoginWithPasswordPayload) {
    return this.request<AuthenticatedResponse>('/auth/password/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  private forgotPassword(payload: ForgotPasswordPayload) {
    return this.request<{ message?: string }>('/auth/password/forgot', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  private verifyPasswordOtp(payload: VerifyPasswordOtpPayload) {
    return this.request<AuthenticatedResponse>('/auth/password/otp/verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  private async listOAuthProviders(options?: ListProvidersOptions) {
    type RawProvider = {
      name: string;
      displayName: string;
      iconURL?: string;
      authURL: string;
      tenantID?: string;
      is_first_party?: boolean;
    };
    const providers = await this.request<RawProvider[]>('/auth/oauth/providers', {
      method: 'GET',
      headers: this.buildTenantHeaders(options?.tenantId),
    });
    return providers.map<OAuthProviderInfo>((provider) => ({
      name: provider.name,
      displayName: provider.displayName,
      iconURL: provider.iconURL,
      authURL: provider.authURL,
      tenantId: provider.tenantID,
      isFirstParty: provider.is_first_party ?? false,
    }));
  }

  private async startOAuthAuthorization(options: StartAuthorizationOptions) {
    const search = new URLSearchParams();
    search.set('provider', options.provider);
    search.set('redirect_uri', options.redirectUri);
    if (options.scope?.length) {
      search.set('scope', options.scope.join(' '));
    }
    const payload = await this.request<OAuthStartResponse>(`/auth/oauth/start?${search.toString()}`, {
      method: 'GET',
      headers: this.buildTenantHeaders(options.tenantId),
    });

    return {
      authorization_url: payload.authorization_url,
      state: payload.state,
      nonce: payload.nonce,
      code_verifier: payload.code_verifier ?? payload.codeVerifier,
      codeVerifier: payload.code_verifier ?? payload.codeVerifier,
    };
  }

  private exchangeOAuthToken(payload: ExchangeTokenOptions) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'tenantId') return;
      if (value === undefined || value === null) return;
      params.set(key, String(value));
    });

    return this.request<AuthenticatedResponse>('/oauth/token', {
      method: 'POST',
      body: params.toString(),
      headers: {
        ...this.buildTenantHeaders(payload.tenantId),
        'content-type': FORM_CONTENT_TYPE,
      },
    });
  }

  private introspectTokenRequest(token: string) {
    const body = new URLSearchParams({ token });
    return this.request<TokenIntrospectionResponse>('/oauth/introspect', {
      method: 'POST',
      body: body.toString(),
      headers: {
        'content-type': FORM_CONTENT_TYPE,
      },
    });
  }

  private revokeTokenRequest(token: string) {
    const body = new URLSearchParams({ token });
    return this.request<void>('/oauth/revoke', {
      method: 'POST',
      body: body.toString(),
      headers: {
        'content-type': FORM_CONTENT_TYPE,
      },
    });
  }

  private fetchUserInfo(token: string) {
    return this.request<UserInfoResponse>('/oauth/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private buildTenantHeaders(tenantId?: string) {
    if (!tenantId) return undefined;
    return {
      'x-tenant-id': tenantId,
    };
  }

  private buildURL(path: string) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseURL}${normalizedPath}`;
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const headers = new Headers(this.defaultHeaders ?? undefined);
    if (init.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (init.body && !headers.has('content-type')) {
      headers.set('content-type', JSON_CONTENT_TYPE);
    }
    if (!headers.has('accept')) {
      headers.set('accept', JSON_CONTENT_TYPE);
    }
    const response = await this.fetchImpl(this.buildURL(path), {
      ...init,
      headers,
      cache: 'no-store',
      credentials: init.credentials ?? 'include',
    });

    if (!response.ok) {
      throw await this.readError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes(JSON_CONTENT_TYPE)) {
      return (await response.json()) as T;
    }
    return (await response.text()) as T;
  }

  private async readError(response: Response) {
    const status = response.status;
    let details: unknown = null;
    let message =
      status >= 500 ? 'Authentication service is unavailable.' : 'The request could not be processed.';
    let code: string | undefined;

    const cloned = response.clone();
    try {
      details = await cloned.json();
      if (details && typeof details === 'object') {
        const data = details as Record<string, unknown>;
        if (typeof data.error_description === 'string') {
          message = data.error_description;
        } else if (typeof data.message === 'string') {
          message = data.message;
        }
        if (typeof data.error === 'string') {
          code = data.error;
        }
      }
    } catch {
      try {
        const text = await response.text();
        if (text) {
          details = text;
          message = text;
        }
      } catch {
        /* ignore */
      }
    }

    return new AuthClientError(message, status, code, details);
  }

  private static parseOAuthCallback(search?: string): OAuthCallbackParams {
    const params =
      typeof window !== 'undefined' && !search
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(search ?? '');

    return {
      state: params.get('state'),
      code: params.get('code'),
      error: params.get('error'),
    };
  }

  private static get storageAvailable() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      const key = '__sb_oidc__';
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  private static saveOAuthState(payload: OAuthStatePayload) {
    AuthClient.oauthStateCache.set(payload.state, { ...payload, createdAt: payload.createdAt ?? Date.now() });
    if (AuthClient.storageAvailable) {
      window.localStorage.setItem(`${OAUTH_STATE_PREFIX}${payload.state}`, JSON.stringify(payload));
    }
  }

  private static readOAuthState(state?: string) {
    if (!state) return null;
    if (AuthClient.oauthStateCache.has(state)) {
      return AuthClient.oauthStateCache.get(state) ?? null;
    }
    if (AuthClient.storageAvailable) {
      const value = window.localStorage.getItem(`${OAUTH_STATE_PREFIX}${state}`);
      if (value) {
        try {
          const parsed = JSON.parse(value) as OAuthStatePayload;
          AuthClient.oauthStateCache.set(state, parsed);
          return parsed;
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  private static clearOAuthState(state?: string) {
    if (!state) return;
    AuthClient.oauthStateCache.delete(state);
    if (AuthClient.storageAvailable) {
      window.localStorage.removeItem(`${OAUTH_STATE_PREFIX}${state}`);
    }
  }
}
