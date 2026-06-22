import {
  type MutationOptions,
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  CreateRecurringTaskParams,
  ResponseTaskRecurring,
  UpdateRecurringTaskParams,
} from '@/apis/recurring/type';
import { Task, TaskDetailPathParams, UpdateTaskRequest } from '@/apis/task/type';
import {
  createTaskAction,
  deleteTaskAction,
  getTaskAction,
  getTasksAction,
  toggleTaskAction,
  updateRecurringTaskAction,
  updateTaskAction,
} from '@/app/[teamId]/tasklist/_action/task';
import { teamKeys } from '@/queries/teams/queryKeys';

import { groupKeys } from '../group/queryKey';
import { TaskKeyParams, taskKeys } from './queryKeys';

type TaskListQueryParams = Pick<TaskKeyParams, 'groupId' | 'taskListId'>;

const invalidateTaskListAndTeamQueries = (
  queryClient: QueryClient,
  { groupId, taskListId }: TaskListQueryParams,
) => {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: taskKeys.taskList({
        groupId,
        taskListId,
      }),
    }),
    queryClient.invalidateQueries({
      queryKey: teamKeys.group({ groupId }),
    }),
    queryClient.invalidateQueries({
      queryKey: groupKeys.detail({ groupId }),
    }),
  ]);
};

export const useGetTasks = ({ groupId, taskListId, date }: Omit<TaskKeyParams, 'taskId'>) => {
  return useQuery({
    queryKey: taskKeys.date({ groupId, taskListId, date }),
    queryFn: async () => getTasksAction({ groupId, taskListId, date }),
  });
};

export const useGetTask = ({ groupId, taskListId, taskId }: Omit<TaskKeyParams, 'date'>) => {
  return useQuery({
    queryKey: taskKeys.detail({ groupId, taskListId, taskId }),
    queryFn: async () => getTaskAction({ groupId, taskListId, taskId }),
  });
};

export const useCreateTask = (
  mutationOptions?: MutationOptions<ResponseTaskRecurring, Error, CreateRecurringTaskParams>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseTaskRecurring, Error, CreateRecurringTaskParams>({
    ...mutationOptions,
    mutationFn: createTaskAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return invalidateTaskListAndTeamQueries(queryClient, variables);
    },
  });
};

export const useUpdateRecurringTask = (
  mutationOptions?: MutationOptions<ResponseTaskRecurring, Error, UpdateRecurringTaskParams>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseTaskRecurring, Error, UpdateRecurringTaskParams>({
    ...mutationOptions,
    mutationFn: updateRecurringTaskAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return invalidateTaskListAndTeamQueries(queryClient, variables);
    },
  });
};

export const useUpdateTask = (
  mutationOptions?: MutationOptions<Task, Error, UpdateTaskRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, UpdateTaskRequest>({
    ...mutationOptions,
    mutationFn: updateTaskAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: taskKeys.detail({
            groupId: variables.groupId,
            taskListId: variables.taskListId,
            taskId: variables.taskId,
          }),
        }),
        invalidateTaskListAndTeamQueries(queryClient, variables),
      ]);
    },
  });
};

export const useToggleTask = (
  mutationOptions?: MutationOptions<Task, Error, UpdateTaskRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, UpdateTaskRequest>({
    ...mutationOptions,
    mutationFn: toggleTaskAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return invalidateTaskListAndTeamQueries(queryClient, variables);
    },
  });
};

export const useDeleteTask = (
  mutationOptions?: MutationOptions<ResponseTaskRecurring, Error, TaskDetailPathParams>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseTaskRecurring, Error, TaskDetailPathParams>({
    ...mutationOptions,
    mutationFn: deleteTaskAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return invalidateTaskListAndTeamQueries(queryClient, variables);
    },
  });
};
