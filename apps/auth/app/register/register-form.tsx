'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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
import { registerSchema, type RegisterFormValues } from './schema';

type RegisterFormProps = {
  authorizeParams: string;
  clientId?: string | null;
};

type RegisterFormFields = RegisterFormValues & { authorizeParams?: string | null };

export function RegisterForm({ authorizeParams, clientId }: RegisterFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Register.form');
  const feedback = useTranslations('Forms.messages');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      client_id: clientId ?? '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
      setError(null);
      setPending(true);
  
      try {
        const res = await fetch("/auth/password/register", {
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
              form.setError(field as keyof RegisterFormValues, {
                type: 'server',
                message: (msgs as string[])[0],
              });
            });
            return;
          }
  
          setError(data?.error_description ?? feedback('registerFailed'));
          return;
        }
  
        window.location.href = `/oauth/authorize?${authorizeParams}`;
      } catch (err) {
        setError(err instanceof Error ? err.message : feedback('registerFailed'));
      } finally {
        setPending(false);
      }
    };

  return (
    <Form {...form}>
      <form data-test="register-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <input type="hidden" {...form.register('client_id')} value={clientId ?? ''} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="name"
                  placeholder={t('nameLabel')}
                  autoComplete="name"
                  disabled={pending}
                  className="h-11 rounded-2xl border-slate-200 bg-slate-50 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="register-email"
                  type="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={pending}
                  className="h-11 rounded-2xl border-slate-200 bg-slate-50 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={pending}
                    className="h-11 rounded-2xl border-slate-200 bg-slate-50 pr-12 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error ? <FormAlert variant="error" message={error} /> : null}

        <Button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 py-2 text-white shadow transition hover:bg-slate-900/90"
          disabled={pending}
        >
          {pending ? t('submitting') : t('submit')}
        </Button>
      </form>
    </Form>
  );
}
