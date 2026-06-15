'use server';

import {
  CreateRecurringTaskParams,
  ResponseTaskRecurring,
  UpdateRecurringTaskParams,
} from '@/apis/recurring/type';
import { TaskDetailPathParams } from '@/apis/task/type';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';

export type CreateTaskActionResult =
  | { success: true; data: ResponseTaskRecurring }
  | { success: false; error: string };

export const createTaskAction = async ({
  groupId,
  taskListId,
  body,
}: CreateRecurringTaskParams) => {
  try {
    return await serverFetcher<ResponseTaskRecurring>(
      `/groups/${groupId}/task-lists/${taskListId}/recurring`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 추가 중 오류가 발생했습니다');
    throw new Error(errorMessage);
  }
};

export const updateTaskAction = async ({
  groupId,
  taskListId,
  recurringId,
  body,
}: UpdateRecurringTaskParams) => {
  try {
    return await serverFetcher<ResponseTaskRecurring>(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${recurringId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 수정 중 오류가 발생했습니다');
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteTaskAction = async ({ groupId, taskListId, taskId }: TaskDetailPathParams) => {
  try {
    return await serverFetcher<ResponseTaskRecurring>(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        method: 'DELETE',
      },
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 삭제 중 오류가 발생했습니다');
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
