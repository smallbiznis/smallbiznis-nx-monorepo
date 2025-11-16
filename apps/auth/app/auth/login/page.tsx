'use client';
/* eslint-disable */
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Label } from '@smallbiznis/ui/components';
import { trackEvent } from '@smallbiznis/tracking';

import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    trackEvent('user.login_submit', data);
    const res = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      trackEvent('user.login_success');
      router.push('/dashboard');
    } else {
      trackEvent('user.login_failed');
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
      <p className="text-slate-500 text-sm mb-6">
        Sign in to continue automating.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="w-full px-2 py-1 rounded-md"
            {...register('email')}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="w-full px-2 py-1 rounded-md"
            {...register('password')}
            required
          />
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2"
          variant="default"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-sm text-center text-slate-500 mt-6 space-y-2">
        <p>
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </p>
        <p>
          Don’t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
