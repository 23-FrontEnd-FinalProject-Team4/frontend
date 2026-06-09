import clientFetcher from '@/lib/clientFetcher';

import type {
  Comment,
  CommentDetailPathParams,
  CommentPathParams,
  CreateCommentRequest,
  UpdateCommentRequest,
} from './type';

const getCommentBaseUrl = ({ taskId }: CommentPathParams) => `/tasks/${taskId}/comments`;

export const getComments = async ({ taskId }: CommentPathParams) => {
  const { data } = await clientFetcher.get<Comment[]>(getCommentBaseUrl({ taskId }));

  return data;
};

export const createComment = async ({ taskId, content }: CreateCommentRequest) => {
  const { data } = await clientFetcher.post<Comment>(getCommentBaseUrl({ taskId }), {
    content,
  });

  return data;
};

export const updateComment = async ({ taskId, commentId, content }: UpdateCommentRequest) => {
  const { data } = await clientFetcher.patch<Comment>(
    `${getCommentBaseUrl({ taskId })}/${commentId}`,
    {
      content,
    },
  );

  return data;
};

export const deleteComment = async ({ taskId, commentId }: CommentDetailPathParams) => {
  await clientFetcher.delete(`${getCommentBaseUrl({ taskId })}/${commentId}`);
};
