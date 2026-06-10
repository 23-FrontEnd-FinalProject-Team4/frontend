import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.').max(50, ''),

  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(1000, '내용은 1000자 이하로 입력해주세요.'),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
