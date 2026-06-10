import type { Task } from '@/apis/task/type';

export interface ResponseGetTaskLists {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

export interface RequestCreateTaskList {
  name: string;
}

export interface ResponseCreateTaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

export interface RequestUpdateTaskListName {
  name?: string;
}

export interface ResponseUpdateTaskListName {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

export interface RequestUpdateTaskListOrder {
  displayIndex: number;
}

export interface GetTaskListsParams {
  groupId: number;
  id: string;
}

export interface CreateTaskListParams {
  groupId: number;
  body: RequestCreateTaskList;
}

export interface UpdateTaskListNameParams {
  groupId: number;
  id: string;
  body: RequestUpdateTaskListName;
}

export interface UpdateTaskListOrderParams {
  groupId: number;
  id: string;
  body: RequestUpdateTaskListOrder;
}

export interface DeleteTaskListParams {
  groupId: number;
  id: string;
}

