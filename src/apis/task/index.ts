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

const getTaskListBaseUrl = ({ teamId, groupId, taskListId }: TaskPathParams) =>
  `/${teamId}/groups/${groupId}/task-lists/${taskListId}/tasks`;

export const createTask = async ({
  teamId,
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
    getTaskListBaseUrl({ teamId, groupId, taskListId }),
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

export const getTasks = async ({ teamId, groupId, taskListId, date }: GetTasksRequest) => {
  const { data } = await axiosInstance.get<Task[]>(
    getTaskListBaseUrl({ teamId, groupId, taskListId }),
    {
      params: {
        date,
      },
    },
  );

  return data;
};

export const getTask = async ({ teamId, groupId, taskListId, taskId }: TaskDetailPathParams) => {
  const { data } = await axiosInstance.get<Task>(
    `${getTaskListBaseUrl({ teamId, groupId, taskListId })}/${taskId}`,
  );

  return data;
};

export const updateTask = async ({
  teamId,
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: UpdateTaskRequest) => {
  const { data } = await axiosInstance.patch<Task>(
    `${getTaskListBaseUrl({ teamId, groupId, taskListId })}/${taskId}`,
    {
      name,
      description,
      done,
    },
  );

  return data;
};

export const deleteTask = async ({ teamId, groupId, taskListId, taskId }: TaskDetailPathParams) => {
  await axiosInstance.delete(`${getTaskListBaseUrl({ teamId, groupId, taskListId })}/${taskId}`);
};

export const updateTaskOrder = async ({
  teamId,
  groupId,
  taskListId,
  id,
  displayIndex,
}: UpdateTaskOrderRequest) => {
  await axiosInstance.patch(`${getTaskListBaseUrl({ teamId, groupId, taskListId })}/${id}/order`, {
    displayIndex,
  });
};

export const deleteRecurringTask = async ({
  teamId,
  groupId,
  taskListId,
  taskId,
  recurringId,
}: DeleteRecurringTaskPathParams) => {
  await axiosInstance.delete(
    `${getTaskListBaseUrl({ teamId, groupId, taskListId })}/${taskId}/recurring/${recurringId}`,
  );
};
