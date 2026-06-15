'use server';

import {
  CreateRecurringTaskParams,
  ResponseTaskRecurring,
  UpdateRecurringTaskParams,
} from '@/apis/recurring/type';
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
      `/groups/${groupId}/task-lists/${taskListId}/recurring/${recurringId}`,
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
