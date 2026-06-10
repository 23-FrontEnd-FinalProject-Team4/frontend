import { z } from 'zod';

export const nicknameSchema = z
  .string()
  .trim()
  .min(1, '이름은 필수 입력입니다.')
  .max(20, '이름은 최대 20자까지 가능합니다.');
