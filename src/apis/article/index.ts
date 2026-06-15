import {
  ArticleDetail,
  CreateArticleRequest,
  GetArticlesParams,
  GetArticlesResponse,
  UpdateArticleRequest,
} from '@/apis/article/type';
import clientFetcher from '@/lib/clientFetcher';

// 게시글 목록 조회
export const getArticles = async (params: GetArticlesParams) => {
  const response = await clientFetcher.get<GetArticlesResponse>('/articles', {
    params,
  });
  return response.data;
};

// 게시글 작성
export const createArticle = async (request: CreateArticleRequest) => {
  const response = await clientFetcher.post<ArticleDetail>('/articles', request);
  return response.data;
};

// 게시글 상세 조회
export const getArticleDetail = async (id: string) => {
  const response = await clientFetcher.get<ArticleDetail>(`/articles/${id}`);
  return response.data;
};

// 게시글 수정
export const updateArticle = async (id: string, request: UpdateArticleRequest) => {
  const response = await clientFetcher.patch<ArticleDetail>(`/articles/${id}`, request);
  return response.data;
};

// 게시글 삭제
export const deleteArticle = async (id: string) => {
  const response = await clientFetcher.delete<void>(`/articles/${id}`);
  return response.data;
};

// 게시글 좋아요
export const likeArticle = async (id: string) => {
  const response = await clientFetcher.post<ArticleDetail>(`/articles/${id}/like`);
  return response.data;
};

// 게시글 좋아요 취소
export const unlikeArticle = async (id: string) => {
  const response = await clientFetcher.delete<ArticleDetail>(`/articles/${id}/like`);
  return response.data;
};
