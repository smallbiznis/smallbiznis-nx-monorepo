'use client'
import type { PropsWithChildren, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@smallbiznis/ui/card';

type AuthCardProps = PropsWithChildren<{
  title: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
}>;

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  const cardClass = className ? `w-full max-w-md border-slate-200 shadow-sm ${className}` : 'w-full max-w-md border-slate-200 shadow-sm';
  return (
    <Card className={cardClass}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}
