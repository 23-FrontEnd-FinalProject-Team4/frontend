'use server';

import {
  Comment,
  CommentDetailPathParams,
  CommentPathParams,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '@/apis/comment/type';
import { serverFetcher } from '@/lib/serverFetcher';

const getCommentBaseUrl = ({ taskId }: CommentPathParams) => `/tasks/${taskId}/comments`;

export const getCommentsAction = async ({ taskId }: CommentPathParams) => {
  return serverFetcher<Comment[]>(getCommentBaseUrl({ taskId }));
};

export const createTaskCommentAction = async ({ taskId, content }: CreateCommentRequest) => {
  return serverFetcher<Comment>(getCommentBaseUrl({ taskId }), {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
};

export const updateTaskCommentAction = async ({
  taskId,
  commentId,
  content,
}: UpdateCommentRequest) => {
  return await serverFetcher<Comment>(`${getCommentBaseUrl({ taskId })}/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  });
};

export const deleteTaskCommentAction = async ({ taskId, commentId }: CommentDetailPathParams) => {
  return await serverFetcher<void>(`${getCommentBaseUrl({ taskId })}/${commentId}`, {
    method: 'DELETE',
  });
};
