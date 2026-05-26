import axiosInstance from '../axiosInstance';
import {
  RequestCreateTaskList,
  RequestUpdateTaskListName,
  RequestUpdateTaskListOrder,
  ResponseCreateTaskList,
  ResponseGetTaskLists,
  ResponseUpdateTaskListName,
} from './type';
interface GetTaskListsParams {
  groupId: number;
  id: string;
}

export const GetTaskLists = async ({ groupId, id }: GetTaskListsParams) => {
  const { data } = await axiosInstance.get<ResponseGetTaskLists>(
    `/groups/${groupId}/task-lists/${id}`,
  );
  return data;
};

interface CreateTaskListParams {
  groupId: number;
  body: RequestCreateTaskList;
}

export const CreateTaskList = async ({ groupId, body }: CreateTaskListParams) => {
  const { data } = await axiosInstance.post<ResponseCreateTaskList>(
    `/groups/${groupId}/task-lists`,
    body,
  );
  return data;
};

interface UpdateTaskListNameParams {
  groupId: number;
  id: string;
  body: RequestUpdateTaskListName;
}

export const UpdateTaskListName = async ({ groupId, id, body }: UpdateTaskListNameParams) => {
  const { data } = await axiosInstance.patch<ResponseUpdateTaskListName>(
    `/groups/${groupId}/task-lists/${id}`,
    body,
  );
  return data;
};

interface UpdateTaskListOrderParams {
  groupId: number;
  id: string;
  body: RequestUpdateTaskListOrder;
}

export const UpdateTaskListOrder = async ({ groupId, id, body }: UpdateTaskListOrderParams) => {
  await axiosInstance.patch(`/groups/${groupId}/task-lists/${id}/order`, body);
};

interface DeleteTaskListParams {
  groupId: number;
  id: string;
}

export const DeleteTaskList = async ({ groupId, id }: DeleteTaskListParams) => {
  await axiosInstance.delete(`/groups/${groupId}/task-lists/${id}`);
};
