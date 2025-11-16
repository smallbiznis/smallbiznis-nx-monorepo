'use client';
/* eslint-disable */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@smallbiznis/ui/components';
import { trackEvent } from '@smallbiznis/tracking';

import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    trackEvent('user.register_submit', data);
    const res = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      trackEvent('user.created', { email: data.email });
      router.push('/auth/login');
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>
      <p className="text-slate-500 text-sm mb-6">
        Start automating workflows in minutes.
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </form>

      <p className="text-sm text-center text-slate-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
