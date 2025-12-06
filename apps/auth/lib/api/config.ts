const DEFAULT_BASE_URL = 'http://localhost:8080';

export const AUTH_API_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_API?.replace(/\/$/, '') || DEFAULT_BASE_URL;
