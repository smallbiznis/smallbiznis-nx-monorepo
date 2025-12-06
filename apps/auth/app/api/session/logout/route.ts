import { NextResponse } from 'next/server';
import { clearServerTokens } from '@/lib/auth/token-storage.server';

export async function POST() {
  await clearServerTokens();
  return NextResponse.json({ success: true });
}
