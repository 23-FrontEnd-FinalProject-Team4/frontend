import clientFetcher from '@/lib/clientFetcher';

import {
  CommentIdParams,
  CreateArticleCommentRequest,
  CreateArticleCommentResponse,
  DeleteArticleCommentResponse,
  GetArticleCommentsParams,
  GetArticleCommentsResponse,
  UpdateArticleCommentRequest,
  UpdateArticleCommentResponse,
} from './type';

export const getArticleComments = async (params: GetArticleCommentsParams) => {
  const response = await clientFetcher.get<GetArticleCommentsResponse>(
    `/articles/${params.articleId}/comments`,
    {
      params: {
        limit: params.limit,
        cursor: params.cursor,
      },
    },
  );
  return response.data;
};

// 게시글 댓글 작성
export const createArticleComment = async (
  articleId: string,
  request: CreateArticleCommentRequest,
) => {
  const response = await clientFetcher.post<CreateArticleCommentResponse>(
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
  const response = await clientFetcher.patch<UpdateArticleCommentResponse>(
    `/comments/${commentId}`,
    request,
  );
  return response.data;
};

// 게시글 댓글 삭제
export const deleteArticleComment = async ({ commentId }: CommentIdParams) => {
  const response = await clientFetcher.delete<DeleteArticleCommentResponse>(
    `/comments/${commentId}`,
  );
  return response.data;
};
