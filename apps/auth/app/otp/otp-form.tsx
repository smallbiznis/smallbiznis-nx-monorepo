'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
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
import { otpSchema, type OtpFormValues } from './schema';
import { verifyOtpAction } from './actions';
import { useTranslations } from 'next-intl';

type OtpFormProps = {
  email?: string;
  authorizeParams: string;
  clientId?: string | null;
};

type OtpFormFields = OtpFormValues & { authorizeParams?: string | null };

export function OtpForm({ email, authorizeParams, clientId }: OtpFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Otp.form');
  const feedback = useTranslations('Forms.messages');

  const form = useForm<OtpFormFields>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: email ?? '',
      otp: '',
      authorizeParams,
      client_id: clientId ?? '',
    },
  });

  const handleSubmit = (values: OtpFormFields) => {
    setError(null);
    startTransition(() => {
      verifyOtpAction(values)
        .then((result) => {
          if (result.status === 'success') {
            router.push(result.authorizeURL);
            return;
          }

          if (result.fieldErrors) {
            Object.entries(result.fieldErrors).forEach(([field, messages]) => {
              if (!messages?.length) return;
              form.setError(field as keyof OtpFormValues, {
                type: 'server',
                message: messages[0],
              });
            });
          }
          setError(result.message ?? feedback('otpFailed'));
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : feedback('otpFailed'));
        });
    });
  };

  return (
    <Form {...form}>
      <form data-test="otp-verify-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" noValidate>
        <input type="hidden" {...form.register('authorizeParams')} value={authorizeParams} />
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
                  id="otp-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('otpLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="otp-code"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="123456"
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error ? <FormAlert variant="error" message={error} /> : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? t('submitting') : t('submit')}
        </Button>
      </form>
    </Form>
  );
}
