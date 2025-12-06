import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must contain at least 6 characters.'),
  client_id: z.string(),
  scope: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
