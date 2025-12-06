'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

// import {
//   Button,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Input
// } from '@smallbiznis/ui';

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
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { loginSchema, type LoginFormValues } from './schema';

type LoginFormProps = {
  authorizeParams: string;
  clientId?: string | null;
  scope?: string | null;
};

export function LoginForm({ authorizeParams, clientId, scope }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations('Login.form');
  const feedback = useTranslations('Forms.messages');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      client_id: clientId ?? '',
      scope: scope ?? '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/auth/password/login", {
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
            form.setError(field as keyof LoginFormValues, {
              type: 'server',
              message: (msgs as string[])[0],
            });
          });
          return;
        }

        setError(data?.error_description ?? feedback('loginFailed'));
        return;
      }

      window.location.href = `/oauth/authorize?${authorizeParams}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : feedback('loginFailed'));
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <input type="hidden" {...form.register('client_id')} value={clientId ?? ''} />
        <input type="hidden" {...form.register('scope')} value={scope ?? ''} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  disabled={pending}
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
                    type={showPassword ? "text" : "password"}
                    placeholder={t('passwordPlaceholder')}
                    disabled={pending}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormAlert variant="error" message={error} />}

        <Button type="submit" disabled={pending} className="w-full bg-slate-900 text-white">
          {pending ? t('submitting') : t('submit')}
        </Button>
      </form>
    </Form>
  );
}
