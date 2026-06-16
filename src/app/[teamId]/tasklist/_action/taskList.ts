'use server';

import {
  CreateTaskListParams,
  DeleteTaskListParams,
  ResponseCreateTaskList,
  ResponseUpdateTaskListName,
  UpdateTaskListNameParams,
} from '@/apis/taskList/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const createTaskListAction = async ({ groupId, body }: CreateTaskListParams) => {
  return await serverFetcher<ResponseCreateTaskList>(`/groups/${groupId}/task-lists`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const deleteTaskListAction = async ({ groupId, id: taskListId }: DeleteTaskListParams) => {
  return await serverFetcher<void>(`/groups/${groupId}/task-lists/${taskListId}`, {
    method: 'DELETE',
  });
};

export const updateTaskListNameAction = async ({ groupId, id, body }: UpdateTaskListNameParams) => {
  return await serverFetcher<ResponseUpdateTaskListName>(`/groups/${groupId}/task-lists/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};
