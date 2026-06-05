import axiosInstance from '../axiosInstance';
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
  const { data } = await axiosInstance.get<ResponseGetTaskLists>(
    `/groups/${groupId}/task-lists/${id}`,
  );
  return data;
};

export const createTaskList = async ({ groupId, body }: CreateTaskListParams) => {
  const { data } = await axiosInstance.post<ResponseCreateTaskList>(
    `/groups/${groupId}/task-lists`,
    body,
  );
  return data;
};

export const updateTaskListName = async ({ groupId, id, body }: UpdateTaskListNameParams) => {
  const { data } = await axiosInstance.patch<ResponseUpdateTaskListName>(
    `/groups/${groupId}/task-lists/${id}`,
    body,
  );
  return data;
};

export const updateTaskListOrder = async ({ groupId, id, body }: UpdateTaskListOrderParams) => {
  await axiosInstance.patch(`/groups/${groupId}/task-lists/${id}/order`, body);
};

export const deleteTaskList = async ({ groupId, id }: DeleteTaskListParams) => {
  await axiosInstance.delete(`/groups/${groupId}/task-lists/${id}`);
};
