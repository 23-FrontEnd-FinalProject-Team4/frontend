import { MutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Comment, CreateCommentRequest } from '@/apis/comment/type';
import {
  createTaskCommentAction,
  getCommentsAction,
} from '@/app/[teamId]/tasklist/_action/comments';

import { taskCommentKeys } from './queryKey';

export const useGetTaskComments = ({ taskId }: { taskId: number }) => {
  return useQuery({
    queryKey: taskCommentKeys.all({ taskId }),
    queryFn: () => getCommentsAction({ taskId }),
  });
};

export const useCreateTaskComment = (
  mutationOptions?: MutationOptions<Comment, Error, CreateCommentRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, CreateCommentRequest>({
    ...mutationOptions,
    mutationFn: createTaskCommentAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      queryClient.invalidateQueries({
        queryKey: taskCommentKeys.all({ taskId: variables.taskId }),
      });
    },
  });
};
