import { z } from 'zod';

export const passwordSchema = z.string().min(1, '비밀번호를 입력해주세요.');
