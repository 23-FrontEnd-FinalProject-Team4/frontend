import { z } from 'zod';

import { emailSchema } from '@/schemas/email.schema';
import { passwordSchema } from '@/schemas/password.schema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
