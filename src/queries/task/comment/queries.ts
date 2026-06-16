import { MutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Comment,
  CommentDetailPathParams,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '@/apis/comment/type';
import {
  createTaskCommentAction,
  deleteTaskCommentAction,
  getCommentsAction,
  updateTaskCommentAction,
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

export const useUpdateTaskComment = (
  mutationOptions?: MutationOptions<Comment, Error, UpdateCommentRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Comment, Error, UpdateCommentRequest>({
    ...mutationOptions,
    mutationFn: updateTaskCommentAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      queryClient.invalidateQueries({
        queryKey: taskCommentKeys.detail({
          taskId: variables.taskId,
          commentId: variables.commentId,
        }),
      });
    },
  });
};

export const useDeleteTaskComment = (
  mutationOptions?: MutationOptions<void, Error, CommentDetailPathParams>,
) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CommentDetailPathParams>({
    ...mutationOptions,
    mutationFn: deleteTaskCommentAction,
    onSuccess: (data, variables, onMutateResult, context) => {
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      queryClient.invalidateQueries({
        queryKey: taskCommentKeys.all({
          taskId: variables.taskId,
        }),
      });
    },
  });
};
