import { NextResponse } from 'next/server';
import { authApi } from '@/lib/api';
import type { OTPVerifyPayload } from '@/lib/api/types';
import { persistServerTokens } from '@/lib/auth/token-storage.server';
import { ApiError } from '@/lib/api/errors';

export async function POST(req: Request) {
  let payload: OTPVerifyPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body must be valid JSON' }, { status: 400 });
  }

  if (!payload?.destination || !payload?.code) {
    return NextResponse.json({ error: 'destination and code are required' }, { status: 400 });
  }

  try {
    const response = await authApi.verifyOTP(payload);
    await persistServerTokens(response);
    return NextResponse.json({ user: response.user ?? null });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, details: error.payload },
        { status: error.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Unable to verify OTP' }, { status: 500 });
  }
}
