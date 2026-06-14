'use server';

import { createRecurringTask } from '@/apis/recurring';
import { CreateRecurringTaskParams, ResponseTaskRecurring } from '@/apis/recurring/type';
import clientFetcher from '@/lib/clientFetcher';
import { getErrorMessage } from '@/lib/error';
import { getAccessToken } from '@/utils/auth/token';

export type CreateTaskActionResult =
  | { success: true; data: ResponseTaskRecurring }
  | { success: false; error: string };

export const createTaskAction = async (payload: CreateRecurringTaskParams) => {
  try {
    const accessToken = await getAccessToken();

    clientFetcher.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const data = await createRecurringTask({ ...payload });
    console.log('date: ' + data.startDate);

    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 추가 중 오류가 발생했습니다');
    throw new Error(errorMessage);
  }
};
