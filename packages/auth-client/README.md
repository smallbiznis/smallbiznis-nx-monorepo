# @smallbiznis/auth-client

SDK ringan untuk berbicara dengan SmallBiznis Auth Service. Dirancang agar aplikasi Next.js (dan Node lainnya) dapat memakai endpoint password login, OAuth/OIDC, serta metadata tenant melalui helper yang konsisten.

## Instalasi

```bash
pnpm add @smallbiznis/auth-client
```

## Pemakaian dasar

```ts
import { AuthClient } from '@smallbiznis/auth-client';

const client = new AuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API ?? 'https://auth.internal',
  defaultHeaders: { 'x-tenant-id': 'tenant-123' },
});

const tenant = await client.getTenantMetadata();
const providers = await client.oauth.listProviders();

const { authorization_url, state } = await client.oauth.startAuthorization({
  provider: 'google',
  redirectUri: `${window.location.origin}/oauth/callback`,
});

client.oauth.saveState({ state, redirectUri: `${window.location.origin}/oauth/callback` });
window.location.assign(authorization_url);
```

### Password & Session APIs

- `client.password.register/login/forgot/verifyOtp`
- `client.me(token?)` untuk memanggil `/auth/me`
- `client.oauth.getUserInfo(token)` untuk endpoint `userinfo`

### Tenant Metadata

```ts
const metadata = await client.getTenantMetadata();
console.log(metadata.branding?.headline);
```

### OAuth Helpers

```ts
const providers = await client.oauth.listProviders({ tenantId: 'tenant-123' });
const start = await client.oauth.startAuthorization({
  provider: providers[0].name,
  redirectUri: `${window.location.origin}/oauth/callback`,
});

client.oauth.saveState({
  state: start.state,
  codeVerifier: start.codeVerifier,
  redirectUri: `${window.location.origin}/oauth/callback`,
});

window.location.assign(start.authorization_url);
```

Di callback:

```ts
const params = client.oauth.handleCallback(window.location.search);
const state = client.oauth.readState(params.state ?? undefined);

await client.oauth.exchangeToken({
  grant_type: 'authorization_code',
  code: params.code!,
  redirect_uri: state?.redirectUri,
  code_verifier: state?.codeVerifier,
});
client.oauth.clearState(params.state ?? undefined);
```

### Token management

```ts
await client.oauth.exchangeToken({ grant_type: 'refresh_token', refresh_token: '...' });
await client.oauth.introspectToken('access-token');
await client.oauth.revokeToken('refresh-token');
```

### Error handling

Semua request melempar `AuthClientError` ketika status bukan 2xx. Error ini memiliki properti `status`, `code`, dan `details` (berisi JSON backend).

```ts
try {
  await client.password.login({ email, password });
} catch (error) {
  if (error instanceof AuthClientError && error.code === 'invalid_grant') {
    // tampilkan pesan human readable
  }
}
```
