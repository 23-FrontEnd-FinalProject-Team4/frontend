import { MutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  getTaskListsAction,
  updateTaskListNameAction,
} from '@/app/[teamId]/tasklist/_action/taskList';
import { teamKeys } from '@/queries/teams/queryKeys';

import { taskListKeys } from './queryKey';

export const useGetTaskLists = ({ groupId }: { groupId: number }) => {
  return useQuery({
    queryKey: taskListKeys.all({ groupId }),
    queryFn: async () => getTaskListsAction({ groupId }),
  });
};

export const useCreateTaskList = (
  mutationOptions?: MutationOptions<ResponseCreateTaskList, Error, CreateTaskListParams>,
) => {
  const queryClient = useQueryClient();
  return useMutation<ResponseCreateTaskList, Error, CreateTaskListParams>({
    ...mutationOptions,
    mutationFn: createTaskListAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: taskListKeys.all({ groupId: variables.groupId }),
        }),
        queryClient.invalidateQueries({
          queryKey: teamKeys.group({ groupId: variables.groupId }),
        }),
      ]);
    },
  });
};

export const useUpdateTaskList = (
  mutationOptions?: MutationOptions<ResponseUpdateTaskListName, Error, UpdateTaskListNameParams>,
) => {
  const queryClient = useQueryClient();
  return useMutation<ResponseUpdateTaskListName, Error, UpdateTaskListNameParams>({
    ...mutationOptions,
    mutationFn: updateTaskListNameAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: taskListKeys.all({ groupId: variables.groupId }),
        }),
        queryClient.invalidateQueries({
          queryKey: teamKeys.group({ groupId: variables.groupId }),
        }),
      ]);
    },
  });
};

export const useDeleteTaskList = (
  mutationOptions?: MutationOptions<void, Error, DeleteTaskListParams>,
) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteTaskListParams>({
    ...mutationOptions,
    mutationFn: deleteTaskListAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: taskListKeys.all({ groupId: variables.groupId }),
        }),
        queryClient.invalidateQueries({
          queryKey: teamKeys.group({ groupId: variables.groupId }),
        }),
      ]);
    },
  });
};
