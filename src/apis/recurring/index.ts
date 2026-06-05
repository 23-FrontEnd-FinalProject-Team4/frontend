import axiosInstance from '../axiosInstance';
import {
  CreateRecurringTaskParams,
  ResponseTaskRecurring,
  UpdateRecurringTaskParams,
} from './type';

export const createRecurringTask = async ({
  groupId,
  taskListId,
  body,
}: CreateRecurringTaskParams) => {
  const { data } = await axiosInstance.post<ResponseTaskRecurring>(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    body,
  );
  return data;
};

export const updateRecurringTask = async ({
  groupId,
  taskListId,
  recurringId,
  body,
}: UpdateRecurringTaskParams) => {
  const { data } = await axiosInstance.patch<ResponseTaskRecurring>(
    `/groups/${groupId}/task-lists/${taskListId}/recurring/${recurringId}`,
    body,
  );
  return data;
};
