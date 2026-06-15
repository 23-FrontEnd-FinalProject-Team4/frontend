'use server';

import {
  CreateTaskListParams,
  DeleteTaskListParams,
  ResponseCreateTaskList,
  UpdateTaskListNameParams,
} from '@/apis/taskList/type';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';

export const createTaskListAction = async ({ groupId, body }: CreateTaskListParams) => {
  try {
    return await serverFetcher<ResponseCreateTaskList>(`/groups/${groupId}/task-lists`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 목록 추가 중 오류가 발생했습니다');
    throw new Error(errorMessage);
  }
};

export const deleteTaskListAction = async ({ groupId, id: taskListId }: DeleteTaskListParams) => {
  try {
    return await serverFetcher(`/groups/${groupId}/task-lists/${taskListId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 목록 삭제 중 오류가 발생했습니다');
    throw new Error(errorMessage);
  }
};

export const updateTaskListAction = async ({ groupId, id, body }: UpdateTaskListNameParams) => {
  try {
    return await serverFetcher(`/groups/${groupId}/task-lists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error, '할 일 목록 수정 중 오류가 발생했습니다');
    throw new Error(errorMessage);
  }
};
