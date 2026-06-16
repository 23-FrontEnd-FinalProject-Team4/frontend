import { MutationOptions, useMutation } from '@tanstack/react-query';

import {
  CreateRecurringTaskParams,
  ResponseTaskRecurring,
  UpdateRecurringTaskParams,
} from '@/apis/recurring/type';
import { Task, TaskDetailPathParams, UpdateTaskRequest } from '@/apis/task/type';
import {
  createTaskAction,
  deleteTaskAction,
  updateRecurringTaskAction,
  updateTaskAction,
} from '@/app/[teamId]/tasklist/_action/task';

export const useCreateTask = (
  mutationOptions: MutationOptions<ResponseTaskRecurring, Error, CreateRecurringTaskParams>,
) => {
  return useMutation<ResponseTaskRecurring, Error, CreateRecurringTaskParams>({
    mutationFn: createTaskAction,
    ...mutationOptions,
  });
};

export const useUpdateRecurringTask = (
  mutationOptions: MutationOptions<ResponseTaskRecurring, Error, UpdateRecurringTaskParams>,
) => {
  return useMutation<ResponseTaskRecurring, Error, UpdateRecurringTaskParams>({
    mutationFn: updateRecurringTaskAction,
    ...mutationOptions,
  });
};

export const useUpdateTask = (mutationOptions: MutationOptions<Task, Error, UpdateTaskRequest>) => {
  return useMutation<Task, Error, UpdateTaskRequest>({
    mutationFn: updateTaskAction,
    ...mutationOptions,
  });
};

export const useDeleteTask = (
  mutationOptions: MutationOptions<ResponseTaskRecurring, Error, TaskDetailPathParams>,
) => {
  return useMutation<ResponseTaskRecurring, Error, TaskDetailPathParams>({
    mutationFn: deleteTaskAction,
    ...mutationOptions,
  });
};
