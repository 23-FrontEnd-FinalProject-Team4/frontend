import { useMutation } from '@tanstack/react-query';

import { createTaskAction, updateTaskAction } from '@/app/[teamId]/tasklist/_action/task';

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
