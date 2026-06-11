import clientFetcher from '@/lib/clientFetcher';

import {
  CreateTaskListParams,
  DeleteTaskListParams,
  GetTaskListsParams,
  ResponseCreateTaskList,
  ResponseGetTaskLists,
  ResponseUpdateTaskListName,
  UpdateTaskListNameParams,
  UpdateTaskListOrderParams,
} from './type';

export const getTaskList = async ({ groupId, id }: GetTaskListsParams) => {
  const { data } = await clientFetcher.get<ResponseGetTaskLists>(
    `/groups/${groupId}/task-lists/${id}`,
  );
  return data;
};

export const createTaskList = async ({ groupId, body }: CreateTaskListParams) => {
  const { data } = await clientFetcher.post<ResponseCreateTaskList>(
    `/groups/${groupId}/task-lists`,
    body,
  );
  return data;
};

export const updateTaskListName = async ({ groupId, id, body }: UpdateTaskListNameParams) => {
  const { data } = await clientFetcher.patch<ResponseUpdateTaskListName>(
    `/groups/${groupId}/task-lists/${id}`,
    body,
  );
  return data;
};

export const updateTaskListOrder = async ({ groupId, id, body }: UpdateTaskListOrderParams) => {
  await clientFetcher.patch(`/groups/${groupId}/task-lists/${id}/order`, body);
};

export const deleteTaskList = async ({ groupId, id }: DeleteTaskListParams) => {
  await clientFetcher.delete(`/groups/${groupId}/task-lists/${id}`);
};
