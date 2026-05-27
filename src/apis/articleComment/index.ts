import axiosInstance from '@/apis/axiosInstance';

import {
  ArticleIdParams,
  CommentIdParams,
  CreateArticleCommentRequest,
  CreateArticleCommentResponse,
  DeleteArticleCommentResponse,
  GetArticleCommentsParams,
  GetArticleCommentsResponse,
  UpdateArticleCommentRequest,
  UpdateArticleCommentResponse,
} from './type';

export const getArticleComments = async ({
  articleId,
  limit,
  cursor,
}: GetArticleCommentsParams) => {
  const response = await axiosInstance.get<GetArticleCommentsResponse>(
    `/articles/${articleId}/comments`,
    {
      params: {
        limit,
        cursor,
      },
    },
  );
  return response.data;
};

// 게시글 댓글 작성
export const createArticleComment = async (
  { articleId }: ArticleIdParams,
  request: CreateArticleCommentRequest,
) => {
  const response = await axiosInstance.post<CreateArticleCommentResponse>(
    `/articles/${articleId}/comments`,
    request,
  );

  return response.data;
};

// 게시글 댓글 수정
export const updateArticleComment = async (
  { commentId }: CommentIdParams,
  request: UpdateArticleCommentRequest,
) => {
  const response = await axiosInstance.patch<UpdateArticleCommentResponse>(
    `/comments/${commentId}`,
    request,
  );
  return response.data;
};

// 게시글 댓글 삭제
export const deleteArticleComment = async ({ commentId }: CommentIdParams) => {
  const response = await axiosInstance.delete<DeleteArticleCommentResponse>(
    `/comments/${commentId}`,
  );
  return response.data;
};
