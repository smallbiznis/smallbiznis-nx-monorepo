export function buildAuthorizePath(authorizeParams?: string | null) {
  if (!authorizeParams) {
    return '/oauth/authorize';
  }
  const trimmed = authorizeParams.startsWith('?') ? authorizeParams.slice(1) : authorizeParams;
  if (!trimmed) {
    return '/oauth/authorize';
  }
  return `/oauth/authorize?${trimmed}`;
}
