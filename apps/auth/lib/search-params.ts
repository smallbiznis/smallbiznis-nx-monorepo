export type SearchParams = Record<string, string | string[] | undefined>;

export function readSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }
  return typeof value === 'string' ? value : null;
}

const OIDC_PARAM_KEYS = [
  'client_id',
  'redirect_uri',
  'response_type',
  'scope',
  'state',
  'nonce',
  'code_challenge',
  'code_challenge_method',
];

export function buildAuthorizeParams(params?: SearchParams) {
  if (!params) return '';
  const entries: [string, string][] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (!OIDC_PARAM_KEYS.includes(key)) {
      return;
    }
    const normalized = Array.isArray(value) ? value[0] : value;
    if (typeof normalized === 'string' && normalized.length > 0) {
      entries.push([key, normalized]);
    }
  });
  return new URLSearchParams(entries).toString();
}
