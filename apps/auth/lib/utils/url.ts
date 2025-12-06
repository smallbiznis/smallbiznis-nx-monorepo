import { headers } from 'next/headers';

export async function getAppBaseUrl() {
  const headerList = await headers();
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') ?? 'http';
  if (!host) {
    return '';
  }
  return `${protocol}://${host}`;
}
