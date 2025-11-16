'use client';
/* eslint-disable */
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@smallbiznis/ui/components';

export default function ResetPasswordPage() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
      <p className="text-slate-500 text-sm mb-6">
        Choose a strong new password to secure your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>New Password</Label>
          <Input type="password" {...register('newPassword')} required />
        </div>
        <Button className="w-full">Change Password</Button>
      </form>
    </div>
  );
}
