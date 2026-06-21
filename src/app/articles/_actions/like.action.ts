'use server';

import type { ArticleDetail } from '@/apis/article/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const createArticleLikeAction = async (articleId: string): Promise<ArticleDetail> => {
  return serverFetcher<ArticleDetail>(`/articles/${articleId}/like`, {
    method: 'POST',
  });
};

export const deleteArticleLikeAction = async (articleId: string): Promise<ArticleDetail> => {
  return serverFetcher<ArticleDetail>(`/articles/${articleId}/like`, {
    method: 'DELETE',
  });
};
