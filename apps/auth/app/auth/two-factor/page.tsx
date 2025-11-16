'use client';
/* eslint-disable */
import { useForm } from 'react-hook-form';
import { Button, Input, Label } from '@smallbiznis/ui/components';

export default function TwoFactorPage() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    fetch(`/api/auth/verify-2fa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Two-Factor Authentication</h1>
      <p className="text-slate-500 text-sm mb-6">
        Enter the 6-digit code sent to your device.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Authentication Code</Label>
          <Input
            type="text"
            inputMode="numeric"
            {...register('otp')}
            maxLength={6}
            required
          />
        </div>
        <Button className="w-full">Verify</Button>
      </form>
    </div>
  );
}
