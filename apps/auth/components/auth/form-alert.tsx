import type { ReactNode } from 'react';
import { Alert, AlertDescription } from '@smallbiznis/ui/alert';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

type FormAlertProps = {
  variant: 'error' | 'success';
  message: ReactNode;
};

export function FormAlert({ variant, message }: FormAlertProps) {
  const Icon = variant === 'error' ? AlertCircleIcon : CheckCircleIcon;
  const alertVariant = variant === 'error' ? 'destructive' : 'default';
  return (
    <Alert variant={alertVariant} className="border text-sm">
      <Icon className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
