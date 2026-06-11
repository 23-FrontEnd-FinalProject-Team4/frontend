import { z } from 'zod';

import { nicknameSchema } from '@/schemas/nickname.schema';

export const profileUpdateSchema = z.object({
  nickname: nicknameSchema,
  image: z.string().trim(),
});

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;
