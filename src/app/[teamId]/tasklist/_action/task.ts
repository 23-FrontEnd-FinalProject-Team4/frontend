'use server';

import {
  CreateRecurringTaskParams,
  ResponseTaskRecurring,
  UpdateRecurringTaskParams,
} from '@/apis/recurring/type';
import { TaskDetailPathParams, UpdateTaskRequest } from '@/apis/task/type';
import { serverFetcher } from '@/lib/serverFetcher';

export type CreateTaskActionResult =
  | { success: true; data: ResponseTaskRecurring }
  | { success: false; error: string };

export const createTaskAction = async ({
  groupId,
  taskListId,
  body,
}: CreateRecurringTaskParams) => {
  return await serverFetcher<ResponseTaskRecurring>(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};

export const updateTaskAction = async ({
  groupId,
  taskListId,
  recurringId,
  body,
}: UpdateRecurringTaskParams) => {
  return await serverFetcher<ResponseTaskRecurring>(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${recurringId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
  );
};

export const toggleTaskAction = async ({
  groupId,
  taskListId,
  taskId,
  done,
}: UpdateTaskRequest) => {
  return await serverFetcher(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ done }),
  });
};

export const deleteTaskAction = async ({ groupId, taskListId, taskId }: TaskDetailPathParams) => {
  return await serverFetcher<ResponseTaskRecurring>(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      method: 'DELETE',
    },
  );
};
