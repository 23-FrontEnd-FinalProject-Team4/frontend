import { MutationOptions, useMutation } from '@tanstack/react-query';

import {
  CreateTaskListParams,
  DeleteTaskListParams,
  ResponseCreateTaskList,
  ResponseUpdateTaskListName,
  UpdateTaskListNameParams,
} from '@/apis/taskList/type';
import {
  createTaskListAction,
  deleteTaskListAction,
  updateTaskListNameAction,
} from '@/app/[teamId]/tasklist/_action/taskList';

export const useCreateTaskList = (
  mutationOptions: MutationOptions<ResponseCreateTaskList, Error, CreateTaskListParams>,
) => {
  return useMutation<ResponseCreateTaskList, Error, CreateTaskListParams>({
    mutationFn: createTaskListAction,
    ...mutationOptions,
  });
};

export const useUpdateTaskList = (
  mutationOptions: MutationOptions<ResponseUpdateTaskListName, Error, UpdateTaskListNameParams>,
) => {
  return useMutation<ResponseUpdateTaskListName, Error, UpdateTaskListNameParams>({
    mutationFn: updateTaskListNameAction,
    ...mutationOptions,
  });
};

export const useDeleteTaskList = (
  mutationOptions: MutationOptions<void, Error, DeleteTaskListParams>,
) => {
  return useMutation<void, Error, DeleteTaskListParams>({
    mutationFn: deleteTaskListAction,
    ...mutationOptions,
  });
};
