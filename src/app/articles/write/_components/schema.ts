import { z } from 'zod';

export const articleSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.').max(50, '제목은 50자 이하로 입력해주세요.'),

  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(1000, '내용은 1000자 이하로 입력해주세요.'),

  image: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
