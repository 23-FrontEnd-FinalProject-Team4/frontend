'use server';

import type { ArticleComment } from '@/apis/articleComment/type';
import { serverFetcher } from '@/lib/serverFetcher';

type CommentIdParams = {
  commentId: string;
};

type ArticleCommentBody = {
  content: string;
};

export const createArticleCommentAction = async (
  articleId: string,
  body: ArticleCommentBody,
): Promise<ArticleComment> => {
  return serverFetcher<ArticleComment>(`/articles/${articleId}/comments`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const updateArticleCommentAction = async (
  { commentId }: CommentIdParams,
  body: ArticleCommentBody,
): Promise<ArticleComment> => {
  return serverFetcher<ArticleComment>(`/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

export const deleteArticleCommentAction = async ({ commentId }: CommentIdParams): Promise<void> => {
  return serverFetcher<void>(`/comments/${commentId}`, {
    method: 'DELETE',
  });
};
