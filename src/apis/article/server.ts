import type { ArticleDetail } from '@/apis/article/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const getArticleDetailServer = async (id: string): Promise<ArticleDetail> => {
  return serverFetcher<ArticleDetail>(`/articles/${id}`);
};
