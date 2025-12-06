import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must contain at least 8 characters.'),
  client_id: z.string(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
