import { NextResponse } from 'next/server';
import { authApi } from '@/lib/api';
import { ApiError } from '@/lib/api/errors';
import {
  clearServerTokens,
  persistServerTokens,
  readServerToken,
} from '@/lib/auth/token-storage.server';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/auth/token-constants';

export async function GET() {
  const accessToken = await readServerToken(ACCESS_TOKEN_COOKIE);

  if (accessToken) {
    try {
      const profile = await authApi.getAuthMe(accessToken);
      return NextResponse.json({ user: profile });
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 401)) {
        const status = error instanceof ApiError ? error.status : 500;
        const message = error instanceof ApiError ? error.message : 'Unable to fetch profile';
        return NextResponse.json({ error: message }, { status });
      }
    }
  }

  const refreshToken = await readServerToken(REFRESH_TOKEN_COOKIE);
  if (!refreshToken) {
    await clearServerTokens();
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const tokens = await authApi.exchangeOAuthToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    await persistServerTokens(tokens);
    if (!tokens.access_token) {
      throw new Error('access_token missing from refresh response');
    }
    const profile = await authApi.getAuthMe(tokens.access_token);
    return NextResponse.json({ user: profile });
  } catch (error) {
    await clearServerTokens();
    const status = error instanceof ApiError ? error.status : 500;
    const message = error instanceof ApiError ? error.message : 'Unable to refresh session';
    return NextResponse.json({ error: message }, { status });
  }
}
