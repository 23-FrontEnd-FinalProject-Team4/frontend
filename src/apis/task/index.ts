import axiosInstance from '@/apis/axiosInstance';

import type {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteRecurringTaskPathParams,
  GetTasksRequest,
  Task,
  TaskDetailPathParams,
  TaskPathParams,
  UpdateTaskOrderRequest,
  UpdateTaskRequest,
} from './type';

const getTaskListBaseUrl = ({ groupId, taskListId }: TaskPathParams) =>
  `/groups/${groupId}/task-lists/${taskListId}/tasks`;

export const createTask = async ({
  groupId,
  taskListId,
  name,
  description,
  startDate,
  frequencyType,
  monthDay,
  weekDays,
}: CreateTaskRequest) => {
  const { data } = await axiosInstance.post<CreateTaskResponse>(
    getTaskListBaseUrl({ groupId, taskListId }),
    {
      name,
      description,
      startDate,
      frequencyType,
      monthDay,
      weekDays,
    },
  );

  return data;
};

export const getTasks = async ({ groupId, taskListId, date }: GetTasksRequest) => {
  const { data } = await axiosInstance.get<Task[]>(
    getTaskListBaseUrl({ groupId, taskListId }),
    {
      params: {
        date,
      },
    },
  );

  return data;
};

export const getTask = async ({ groupId, taskListId, taskId }: TaskDetailPathParams) => {
  const { data } = await axiosInstance.get<Task>(
    `${getTaskListBaseUrl({ groupId, taskListId })}/${taskId}`,
  );

  return data;
};

export const updateTask = async ({
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: UpdateTaskRequest) => {
  const { data } = await axiosInstance.patch<Task>(
    `${getTaskListBaseUrl({ groupId, taskListId })}/${taskId}`,
    {
      name,
      description,
      done,
    },
  );

  return data;
};

export const deleteTask = async ({ groupId, taskListId, taskId }: TaskDetailPathParams) => {
  await axiosInstance.delete(`${getTaskListBaseUrl({ groupId, taskListId })}/${taskId}`);
};

export const updateTaskOrder = async ({
  groupId,
  taskListId,
  id,
  displayIndex,
}: UpdateTaskOrderRequest) => {
  await axiosInstance.patch(`${getTaskListBaseUrl({ groupId, taskListId })}/${id}/order`, {
    displayIndex,
  });
};

export const deleteRecurringTask = async ({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: DeleteRecurringTaskPathParams) => {
  await axiosInstance.delete(
    `${getTaskListBaseUrl({ groupId, taskListId })}/${taskId}/recurring/${recurringId}`,
  );
};
