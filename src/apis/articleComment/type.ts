export interface ArticleCommentWriter {
  id: number;
  nickname: string;
  image: string;
}

export interface ArticleComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: ArticleCommentWriter;
}

// 클라이언트에서 서버

export interface ArticleIdParams {
  articleId: number;
}

export interface CommentIdParams {
  commentId: number;
}

export interface GetArticleCommentsParams extends ArticleIdParams {
  limit: number;
  cursor?: number;
}

export interface ArticleCommentForm {
  content: string;
}

export type CreateArticleCommentRequest = ArticleCommentForm;

export type UpdateArticleCommentRequest = ArticleCommentForm;

// 서버에서 클라이언트

export interface GetArticleCommentsResponse {
  nextCursor: number | null;
  list: ArticleComment[];
}

export type CreateArticleCommentResponse = ArticleComment;

export type UpdateArticleCommentResponse = ArticleComment;

export interface DeleteArticleCommentResponse {
  id: number;
}
