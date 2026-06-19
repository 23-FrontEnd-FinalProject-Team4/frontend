'use server';

import type {
  ArticleDetail,
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/apis/article/type';
import type { UploadImageResponse } from '@/apis/image/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const createArticleAction = async (body: CreateArticleRequest): Promise<ArticleDetail> => {
  return serverFetcher<ArticleDetail>('/articles', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const updateArticleAction = async (
  articleId: string,
  body: UpdateArticleRequest,
): Promise<ArticleDetail> => {
  return serverFetcher<ArticleDetail>(`/articles/${articleId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

export const deleteArticleAction = async (articleId: string): Promise<void> => {
  return serverFetcher<void>(`/articles/${articleId}`, {
    method: 'DELETE',
  });
};

export const uploadArticleImageAction = async (
  formData: FormData,
): Promise<UploadImageResponse> => {
  return serverFetcher<UploadImageResponse>('/images/upload', {
    method: 'POST',
    body: formData,
  });
};
