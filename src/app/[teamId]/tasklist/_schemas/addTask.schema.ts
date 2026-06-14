import { z } from 'zod';

export const addTaskSchema = z.object({
  name: z.string().min(1, '할 일 제목을 입력해 주세요'),
  date: z.date(),
  time: z.object({
    hour: z.number(),
    minute: z.number(),
  }),
  frequency: z.enum(['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY']),
  description: z.string().optional(),
  weekDays: z.array(z.number().min(0).max(6)).optional(),
});

export type AddTaskFormValues = z.infer<typeof addTaskSchema>;
