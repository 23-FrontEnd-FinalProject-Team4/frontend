import axiosInstance from '../axiosInstance';
import {
  RequestCreateTaskRecurring,
  RequestUpdateTaskRecurring,
  ResponseTaskRecurring,
} from './type';

interface CreateRecurringTaskParams {
  groupId: number;
  taskListId: number;
  body: RequestCreateTaskRecurring;
}

export const CreateRecurringTask = async ({
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

interface UpdateRecurringTaskParams {
  groupId: number;
  taskListId: number;
  recurringId: number;
  body: RequestUpdateTaskRecurring;
}

export const UpdateRecurringTask = async ({
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
