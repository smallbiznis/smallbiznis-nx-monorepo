'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@smallbiznis/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export type Crumb = {
  label: string;
  href?: string;
};

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split('/').filter(Boolean);
  const normalizedSegments = segments[0] === 'dashboard' ? segments.slice(1) : segments;
  const crumbs: Crumb[] = normalizedSegments.map((segment, index) => {
    const href = `/dashboard/${normalizedSegments.slice(0, index + 1).join('/')}`.replace(/\/$/, '');
    const label = segment.replace(/-/g, ' ');
    return { href, label: label.charAt(0).toUpperCase() + label.slice(1) };
  });

  return [{ href: '/dashboard', label: 'Dashboard' }, ...crumbs];
}

export default function Breadcrumbs({ items }: { items?: Crumb[] }) {
  const pathname = usePathname();
  const crumbs = items ?? buildCrumbs(pathname);

  if (!crumbs.length) return null;

  return (
    <Breadcrumb className="px-1">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem key={`${crumb.label}-${index}`}>
            {crumb.href && index !== crumbs.length - 1 ? (
              <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            )}
            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
