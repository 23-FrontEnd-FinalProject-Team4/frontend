import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(1, '비밀번호는 필수 입력입니다.')
  .min(8, '비밀번호는 최소 8자 이상입니다.')
  .regex(/^[A-Za-z0-9!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.');

export const passwordConfirmationSchema = z.string().min(1, '비밀번호 확인을 입력해주세요.');
