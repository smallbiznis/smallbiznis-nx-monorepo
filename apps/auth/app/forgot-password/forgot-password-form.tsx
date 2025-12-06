'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import {
  Button
} from '@smallbiznis/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@smallbiznis/ui/form';

import {
  Input
} from '@smallbiznis/ui/input';

import { FormAlert } from '@/components/auth/form-alert';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from './schema';
import { useTranslations } from 'next-intl';

type ForgotFormProps = {
  clientId?: string | null;
};

export function ForgotPasswordForm({ clientId }: ForgotFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const t = useTranslations('ForgotPassword.form');
  const feedback = useTranslations('Forms.messages');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      client_id: clientId ?? ''
    },
  });

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/auth/password/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);

        if (data?.errors) {
          Object.entries(data.errors).forEach(([field, msgs]) => {
            form.setError(field as keyof ForgotPasswordFormValues, {
              type: 'server',
              message: (msgs as string[])[0],
            });
          });
          return;
        }

        setError(data?.error_description ?? feedback('forgotFailed'));
        return;
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : feedback('forgotFailed'));
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form data-test="forgot-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" noValidate>
        <input type="hidden" {...form.register('client_id')} value={clientId ?? ''} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="forgot-email"
                  type="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error ? <FormAlert variant="error" message={error} /> : null}
        {success ? <FormAlert variant="success" message={t('success')} /> : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? t('submitting') : t('submit')}
        </Button>
      </form>
    </Form>
  );
}
