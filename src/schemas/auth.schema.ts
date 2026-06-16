import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, '이메일은 필수 입력입니다.')
  .pipe(z.email('이메일 형식으로 작성해 주세요.'));

export const nicknameSchema = z
  .string()
  .trim()
  .min(1, '이름은 필수 입력입니다.')
  .max(20, '이름은 최대 20자까지 가능합니다.');

export const passwordSchema = z
  .string()
  .min(1, '비밀번호는 필수 입력입니다.')
  .min(8, '비밀번호는 최소 8자 이상입니다.')
  .regex(/^[A-Za-z0-9!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.');

export const passwordConfirmationSchema = z.string().min(1, '비밀번호 확인을 입력해주세요.');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

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

export const profileUpdateSchema = z.object({
  nickname: nicknameSchema,
  image: z.string().trim(),
});

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;

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

export const accountSettingsSchema = z
  .object({
    nickname: nicknameSchema,
    image: z.string().trim(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    const hasPasswordInput = Boolean(password || passwordConfirmation);

    if (!hasPasswordInput) return;

    if (!password) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: '비밀번호는 필수 입력입니다.',
      });
    } else {
      const passwordValidation = passwordSchema.safeParse(password);
      if (!passwordValidation.success) {
        ctx.addIssue({
          code: 'custom',
          path: ['password'],
          message: passwordValidation.error.issues[0]?.message ?? '비밀번호를 확인해주세요.',
        });
      }
    }

    if (!passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: '비밀번호 확인을 입력해주세요.',
      });
    } else if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;
