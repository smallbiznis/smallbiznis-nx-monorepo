'use client';
/* eslint-disable */
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@smallbiznis/ui/components';

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    fetch(`/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Forgot password?</h1>
      <p className="text-slate-500 text-sm mb-6">
        Enter your email and we’ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            className="w-full px-2"
            type="email"
            {...register('email')}
            required
          />
        </div>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
