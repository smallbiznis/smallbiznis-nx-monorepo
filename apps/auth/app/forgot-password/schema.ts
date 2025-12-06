import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  client_id: z.string(),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
