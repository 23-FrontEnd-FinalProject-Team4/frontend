import axiosInstance from '@/apis/axiosInstance';

import {
  ArticleDetail,
  CreateArticleRequest,
  GetArticlesParams,
  GetArticlesResponse,
  UpdateArticleRequest,
} from './type';

// 게시글 목록 조회
export const getArticles = async (params: GetArticlesParams) => {
  const response = await axiosInstance.get<GetArticlesResponse>('/api/articles', {
    params,
  });
  return response.data;
};

// 게시글 작성
export const createArticle = async (request: CreateArticleRequest) => {
  const response = await axiosInstance.post<ArticleDetail>('/api/articles', request);
  return response.data;
};

// 게시글 상세 조회
export const getArticleDetail = async (id: number) => {
  const response = await axiosInstance.get<ArticleDetail>(`/api/articles/${id}`);
  return response.data;
};

// 게시글 수정
export const updateArticle = async (id: number, request: UpdateArticleRequest) => {
  const response = await axiosInstance.patch<ArticleDetail>(`/api/articles/${id}`, request);
  return response.data;
};

// 게시글 삭제
export const deleteArticle = async (id: number) => {
  const response = await axiosInstance.delete<void>(`/api/articles/${id}`);
  return response.data;
};

// 게시글 좋아요
export const likeArticle = async (id: number) => {
  const response = await axiosInstance.post<ArticleDetail>(`/api/articles/${id}/like`);
  return response.data;
};

// 게시글 좋아요 취소
export const unlikeArticle = async (id: number) => {
  const response = await axiosInstance.delete<ArticleDetail>(`/api/articles/${id}/like`);
  return response.data;
};
