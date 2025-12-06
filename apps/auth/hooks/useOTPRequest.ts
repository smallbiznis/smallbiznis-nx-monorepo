'use client';

import { useCallback, useState } from 'react';
import { authApi } from '@/lib/api';
import type { OTPRequestPayload } from '@/lib/api/types';

export function useOTPRequest() {
  const [data, setData] = useState<{ request_id?: string; expires_in?: number; destination: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const requestOtp = useCallback(async (payload: OTPRequestPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.requestOTP(payload);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    requestOtp,
    reset: () => setData(null),
  };
}
