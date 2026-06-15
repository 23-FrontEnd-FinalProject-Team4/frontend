import { useMutation } from '@tanstack/react-query';

import {
  createTaskListAction,
  deleteTaskListAction,
  updateTaskListAction,
} from '@/app/[teamId]/tasklist/_action/taskList';

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useCreateTaskList = ({ onSuccess, onError }: MutationOptions) => {
  return useMutation({
    mutationFn: createTaskListAction,
    onSuccess,
    onError,
  });
};

export const useUpdateTaskList = ({ onSuccess, onError }: MutationOptions) => {
  return useMutation({
    mutationFn: updateTaskListAction,
    onSuccess,
    onError,
  });
};

export const useDeleteTaskList = ({ onSuccess, onError }: MutationOptions) => {
  return useMutation({
    mutationFn: deleteTaskListAction,
    onSuccess,
    onError,
  });
};
