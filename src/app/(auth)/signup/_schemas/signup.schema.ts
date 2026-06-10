import { z } from 'zod';

import { emailSchema } from '@/schemas/email.schema';
import { nicknameSchema } from '@/schemas/nickname.schema';
import { passwordConfirmationSchema, passwordSchema } from '@/schemas/password.schema';

export const signupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
