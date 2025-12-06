import { z } from 'zod';

export const otpSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  otp: z.string().min(6, 'OTP must contain 6 digits.').max(6, 'OTP must contain 6 digits.'),
  client_id: z.string(),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
