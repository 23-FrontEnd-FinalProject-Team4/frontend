'use server';

import {
  CreateTaskListParams,
  DeleteTaskListParams,
  ResponseCreateTaskList,
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
  return await serverFetcher(`/groups/${groupId}/task-lists/${taskListId}`, {
    method: 'DELETE',
  });
};

export const updateTaskListAction = async ({ groupId, id, body }: UpdateTaskListNameParams) => {
  return await serverFetcher(`/groups/${groupId}/task-lists/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};
