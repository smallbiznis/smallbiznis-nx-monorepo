export type OAuthProviderConfig = {
  name: string;
  displayName: string;
  iconURL?: string;
  authorizationURL: string;
  clientId: string;
  defaultScopes?: string[];
  extraParams?: Record<string, string>;
  isFirstParty?: boolean;
};

export type TenantOAuthConfig = {
  tenantId: string;
  providers: OAuthProviderConfig[];
};

export type OAuthProviderSummary = {
  name: string;
  displayName: string;
  iconURL?: string;
  authURL: string;
  tenantId?: string;
  isFirstParty?: boolean;
};

export type OAuthAuthorizationRequest = {
  provider: string;
  redirectUri: string;
  scope?: string[];
};

export type OAuthAuthorizationResult = {
  authorizationUrl: string;
  state: string;
  nonce: string;
  codeVerifier: string;
};

export type OAuthStateRecord = {
  tenantId: string;
  provider: string;
  nonce: string;
  codeVerifier: string;
  redirectUri: string;
  createdAt: number;
  authorizeParams?: string;
};
