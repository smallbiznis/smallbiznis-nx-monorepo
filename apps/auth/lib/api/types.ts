export type AuthUser = {
  id: string | number;
  email: string;
  name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  tenant_id?: string | number | null;
  [key: string]: unknown;
};

export type AuthenticatedResponse = TokenResponse & {
  user?: AuthUser;
};

export type LoginPasswordRequest = {
  email: string;
  password: string;
  tenant_id?: string | number;
};

export type RegisterPasswordRequest = {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  tenant_id?: string | number;
};

export type ForgotPasswordRequest = {
  email: string;
  redirect_url?: string;
};

export type OTPRequestPayload = {
  destination: string;
  channel?: 'sms' | 'email';
  purpose?: string;
};

export type OTPVerifyPayload = {
  destination: string;
  code: string;
  purpose?: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  refresh_expires_in?: number;
  token_type?: string;
  scope?: string;
};

export type AuthMeResponse = AuthUser;

export type TenantMetadata = {
  id?: string | number;
  name?: string;
  branding?: Record<string, unknown>;
  [key: string]: unknown;
};

export type OpenIdConfiguration = {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  jwks_uri: string;
  userinfo_endpoint?: string;
  response_types_supported?: string[];
  grant_types_supported?: string[];
  scopes_supported?: string[];
  [key: string]: unknown;
};

export type JwksKey = {
  kid: string;
  kty: string;
  alg: string;
  use: string;
  n?: string;
  e?: string;
  x?: string;
  y?: string;
};

export type JwksResponse = {
  keys: JwksKey[];
};

export type OAuthTokenRequest = {
  code?: string;
  grant_type: 'authorization_code' | 'refresh_token' | 'client_credentials' | string;
  redirect_uri?: string;
  code_verifier?: string;
  refresh_token?: string;
  client_id?: string;
  client_secret?: string;
  scope?: string;
};

export type OAuthAuthorizeParams = {
  client_id: string;
  redirect_uri: string;
  response_type?: 'code' | string;
  scope?: string;
  state?: string;
  code_challenge?: string;
  code_challenge_method?: 'S256' | 'plain';
  prompt?: string;
  [key: string]: string | undefined;
};

export type UserInfoResponse = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  [key: string]: unknown;
};
