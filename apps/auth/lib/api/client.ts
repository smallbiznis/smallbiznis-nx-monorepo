import { AUTH_API_BASE_URL } from './config';
import { ApiError } from './errors';
import type {
  AuthMeResponse,
  AuthenticatedResponse,
  ForgotPasswordRequest,
  JwksResponse,
  LoginPasswordRequest,
  OAuthAuthorizeParams,
  OAuthTokenRequest,
  OpenIdConfiguration,
  OTPRequestPayload,
  OTPVerifyPayload,
  RegisterPasswordRequest,
  TenantMetadata,
  TokenResponse,
  UserInfoResponse,
} from './types';

const JSON_HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
} as const;

type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown;
  token?: string | null;
  headers?: HeadersInit;
  searchParams?: Record<string, string | number | boolean | null | undefined>;
};

export class AuthApiClient {
  // private baseUrl: string;

  constructor() {
    // baseUrl: string = AUTH_API_BASE_URL
    // this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private buildUrl(
    path: string,
    searchParams?: RequestOptions['searchParams']
  ) {
    const target = path.startsWith('http')
      ? path
      : `${path.startsWith('/') ? '' : '/'}${path}`;
    const url = new URL(target);
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        url.searchParams.set(key, String(value));
      });
    }
    return url;
  }

  private async request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      searchParams,
      token,
      body,
      headers: customHeaders,
      ...rest
    } = options;
    const url = this.buildUrl(path, searchParams);
    const headers = new Headers(JSON_HEADERS);
    if (customHeaders) {
      new Headers(customHeaders).forEach((value, key) =>
        headers.set(key, value)
      );
    }
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    const init: RequestInit = {
      ...rest,
      headers,
      cache: rest.cache ?? 'no-store',
      credentials: rest.credentials ?? 'include',
    };

    if (body !== undefined) {
      init.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      let payload: unknown = null;
      try {
        payload = await response.json();
      } catch {
        payload = await response.text();
      }
      const message =
        (payload &&
        typeof payload === 'object' &&
        'message' in payload &&
        typeof payload.message === 'string'
          ? payload.message
          : response.statusText) || 'Request failed';
      throw new ApiError(message, response.status, payload);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as T;
  }

  loginWithPassword(body: LoginPasswordRequest) {
    return this.request<AuthenticatedResponse>('/auth/password/login', {
      method: 'POST',
      body,
    });
  }

  registerWithPassword(body: RegisterPasswordRequest) {
    return this.request<AuthenticatedResponse>('/auth/password/register', {
      method: 'POST',
      body,
    });
  }

  requestPasswordReset(body: ForgotPasswordRequest) {
    return this.request<{ message: string }>('/auth/password/forgot', {
      method: 'POST',
      body,
    });
  }

  requestOTP(body: OTPRequestPayload) {
    return this.request<{
      request_id?: string;
      expires_in?: number;
      destination: string;
    }>('/auth/otp/request', {
      method: 'POST',
      body,
    });
  }

  verifyOTP(body: OTPVerifyPayload) {
    return this.request<AuthenticatedResponse>('/auth/otp/verify', {
      method: 'POST',
      body,
    });
  }

  getAuthMe(token?: string | null) {
    return this.request<AuthMeResponse>('/auth/me', {
      method: 'GET',
      token: token ?? undefined,
    });
  }

  getTenantMetadata() {
    return this.request<TenantMetadata>('/.well-known/tenant', {
      method: 'GET',
    });
  }

  getOpenIdConfiguration() {
    return this.request<OpenIdConfiguration>(
      '/.well-known/openid-configuration',
      {
        method: 'GET',
      }
    );
  }

  getJwks() {
    return this.request<JwksResponse>('/.well-known/jwks.json', {
      method: 'GET',
    });
  }

  buildAuthorizeUrl(params: OAuthAuthorizeParams) {
    const url = this.buildUrl('/oauth/authorize', params);
    return url.toString();
  }

  exchangeOAuthToken(body: OAuthTokenRequest) {
    return this.request<TokenResponse>('/oauth/token', {
      method: 'POST',
      body: new URLSearchParams(
        Object.entries(body).reduce<Record<string, string>>(
          (acc, [key, value]) => {
            if (value === undefined || value === null) return acc;
            acc[key] = String(value);
            return acc;
          },
          {}
        )
      ).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  fetchAuthorize(params: OAuthAuthorizeParams) {
    const url = this.buildUrl('/oauth/authorize', params);
    return fetch(url, {
      method: 'GET',
      cache: 'no-store',
      redirect: 'manual',
      credentials: 'include',
    });
  }

  getUserInfo(token?: string | null) {
    return this.request<UserInfoResponse>('/userinfo', {
      method: 'GET',
      token: token ?? undefined,
    });
  }
}

export const authApi = new AuthApiClient();
