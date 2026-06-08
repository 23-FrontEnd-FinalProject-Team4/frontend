import clientFetcher from '@/lib/clientFetcher';

import type {
  Comment,
  CommentDetailPathParams,
  CommentPathParams,
  CreateCommentRequest,
  UpdateCommentRequest,
} from './type';

const getCommentBaseUrl = ({ teamId, taskId }: CommentPathParams) =>
  `/${teamId}/tasks/${taskId}/comments`;

export const getComments = async ({ teamId, taskId }: CommentPathParams) => {
  const { data } = await clientFetcher.get<Comment[]>(getCommentBaseUrl({ teamId, taskId }));

  return data;
};

export const createComment = async ({ teamId, taskId, content }: CreateCommentRequest) => {
  const { data } = await clientFetcher.post<Comment>(getCommentBaseUrl({ teamId, taskId }), {
    content,
  });

  return data;
};

export const updateComment = async ({
  teamId,
  taskId,
  commentId,
  content,
}: UpdateCommentRequest) => {
  const { data } = await clientFetcher.patch<Comment>(
    `${getCommentBaseUrl({ teamId, taskId })}/${commentId}`,
    {
      content,
    },
  );

  return data;
};

export const deleteComment = async ({ teamId, taskId, commentId }: CommentDetailPathParams) => {
  await clientFetcher.delete(`${getCommentBaseUrl({ teamId, taskId })}/${commentId}`);
};
