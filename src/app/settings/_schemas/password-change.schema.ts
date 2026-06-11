import { z } from 'zod';

import { passwordConfirmationSchema, passwordSchema } from '@/schemas/password.schema';

export const passwordChangeSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;
