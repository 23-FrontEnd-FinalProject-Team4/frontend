import { z } from 'zod';

export const groupIdSchema = z.coerce
  .number()
  .int('그룹 ID는 정수여야 합니다.')
  .positive('그룹 ID가 올바르지 않습니다.');

export const teamPageQuerySchema = z.object({
  teamId: z.string().trim().min(1, '팀 ID가 필요합니다.'),
  date: z.string().trim().optional(),
});

export type TeamPageQueryValues = z.infer<typeof teamPageQuerySchema>;

export const teamUpdateSchema = z.object({
  groupId: groupIdSchema,
  name: z
    .string()
    .trim()
    .min(1, '팀 이름을 입력해주세요.')
    .max(20, '팀 이름은 20자 이하로 입력해주세요.'),
  image: z.string().trim().nullable().optional(),
});

export type TeamUpdateValues = z.infer<typeof teamUpdateSchema>;

export const teamDeleteSchema = z.object({
  groupId: groupIdSchema,
});

export type TeamDeleteValues = z.infer<typeof teamDeleteSchema>;

export const teamInvitationSchema = z.object({
  groupId: groupIdSchema,
});

export type TeamInvitationValues = z.infer<typeof teamInvitationSchema>;

export const taskListCreateSchema = z.object({
  groupId: groupIdSchema,
  name: z
    .string()
    .trim()
    .min(1, '할 일 목록 이름을 입력해주세요.')
    .max(30, '할 일 목록 이름은 30자 이하로 입력해주세요.'),
});

export type TaskListCreateValues = z.infer<typeof taskListCreateSchema>;

export const teamJoinSchema = z.object({
  teamLink: z.string().trim().min(1, '팀 링크를 입력해주세요.'),
});

export type TeamJoinValues = z.infer<typeof teamJoinSchema>;

export const teamCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '팀 이름을 입력해주세요.')
    .max(20, '팀 이름은 20자 이하로 입력해주세요.'),
});

export type TeamCreateValues = z.infer<typeof teamCreateSchema>;
