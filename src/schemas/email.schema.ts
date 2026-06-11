import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, '이메일은 필수 입력입니다.')
  .pipe(z.email('이메일 형식으로 작성해 주세요.'));
