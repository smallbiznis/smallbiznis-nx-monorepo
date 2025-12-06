'use client';

import type { AuthUser } from './types';

const JSON_HEADERS = {
  'content-type': 'application/json',
  accept: 'application/json',
} as const;

export async function mutateSession(
  path: string,
  payload: unknown,
  fallbackMessage: string
): Promise<AuthUser | null> {
  const response = await fetch(path, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, fallbackMessage));
  }

  if (response.status === 204) {
    return null;
  }

  const json = (await response.json()) as { user?: AuthUser | null };
  return json.user ?? null;
}

async function readErrorMessage(response: Response, fallbackMessage: string) {
  const text = await response.text();
  if (!text) {
    return fallbackMessage;
  }
  try {
    const data = JSON.parse(text) as { error?: string };
    if (data?.error) {
      return data.error;
    }
  } catch {
    /* ignore */
  }
  return text || fallbackMessage;
}
