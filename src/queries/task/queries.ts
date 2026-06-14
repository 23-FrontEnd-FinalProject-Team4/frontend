import { useMutation } from '@tanstack/react-query';

import { createTaskAction } from '@/app/[teamId]/tasklist/_action/task';

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
