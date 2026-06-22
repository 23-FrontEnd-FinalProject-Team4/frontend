'use server';

import { GroupDetail, TaskList } from '@/apis/group/type';
import {
  CreateTaskListParams,
  DeleteTaskListParams,
  GetTaskListsParams,
  ResponseCreateTaskList,
  ResponseUpdateTaskListName,
  UpdateTaskListNameParams,
} from '@/apis/taskList/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const getGroupAction = async ({ groupId }: { groupId: number }) => {
  return await serverFetcher<GroupDetail>(`/groups/${groupId}`);
};

export const getTaskListsAction = async ({ groupId }: { groupId: number }) => {
  return (await getGroupAction({ groupId })).taskLists;
};

export const getTaskListAction = async ({ groupId, id, date }: GetTaskListsParams) => {
  const requestURL = `/groups/${groupId}/task-lists/${id}` + (date ? `?date=${date}` : '');
  return await serverFetcher<TaskList>(requestURL);
};

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
