import { useMutation } from '@tanstack/react-query';

import {
  createTaskAction,
  deleteTaskAction,
  updateTaskAction,
} from '@/app/[teamId]/tasklist/_action/task';

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useCreateTask = ({ onSuccess, onError }: MutationOptions) => {
  return useMutation({
    mutationFn: createTaskAction,
    onSuccess,
    onError,
  });
};

export const useUpdateTask = ({ onSuccess, onError }: MutationOptions) => {
  return useMutation({
    mutationFn: updateTaskAction,
    onSuccess,
    onError,
  });
};

export const useDeleteTask = ({ onSuccess, onError }: MutationOptions) => {
  return useMutation({
    mutationFn: deleteTaskAction,
    onSuccess,
    onError,
  });
};
