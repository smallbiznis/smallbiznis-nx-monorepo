export type AuthUser = {
  id: string | number;
  email: string;
  name?: string | null;
  phone?: string | null;
  tenant_id?: string | number | null;
  [key: string]: unknown;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  refresh_expires_in?: number;
  token_type?: string;
  scope?: string;
};

export type AuthenticatedResponse = AuthTokens & {
  user?: AuthUser | null;
};

export type RegisterWithPasswordPayload = {
  client_id: string;
  name: string;
  email: string;
  password: string;
};

export type LoginWithPasswordPayload = {
  client_id: string;
  scope: string;
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type VerifyPasswordOtpPayload = {
  email: string;
  otp: string;
};

export type OAuthProviderInfo = {
  name: string;
  displayName: string;
  iconURL?: string;
  authURL: string;
  tenantId?: string | number | null;
  isFirstParty?: boolean;
};

export type OAuthStartResponse = {
  authorization_url: string;
  state: string;
  nonce: string;
  code_verifier?: string;
  codeVerifier?: string;
};

export type OAuthCallbackParams = {
  state?: string | null;
  code?: string | null;
  error?: string | null;
};

export type TokenIntrospectionResponse = {
  active: boolean;
  scope?: string;
  client_id?: string;
  username?: string;
  token_type?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  sub?: string;
  aud?: string | string[];
  iss?: string;
  jti?: string;
  [key: string]: unknown;
};

export type UserInfoResponse = {
  sub: string;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  [key: string]: unknown;
};

export type OAuthTokenRequest = {
  grant_type: string;
  code?: string;
  redirect_uri?: string;
  code_verifier?: string;
  refresh_token?: string;
  username?: string;
  password?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
  [key: string]: unknown;
};

export type TenantMetadata = {
  id?: string | number;
  name?: string;
  logo_url?: string;
  branding?: {
    headline?: string;
    subheading?: string;
    logoUrl?: string;
    primaryColor?: string;
    registerHeadline?: string;
    registerDescription?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type OAuthStatePayload = {
  state: string;
  nonce?: string;
  codeVerifier?: string;
  redirectUri: string;
  authorizeParams?: string;
  provider?: string;
  createdAt?: number;
};
