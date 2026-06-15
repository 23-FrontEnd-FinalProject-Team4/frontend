export type ArticleCommentWriter = {
  id: string;
  nickname: string;
  image: string;
};

export type ArticleComment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: ArticleCommentWriter;
};

// 클라이언트에서 서버

export type ArticleIdParams = {
  articleId: string;
};

export type CommentIdParams = {
  commentId: string;
};

export type GetArticleCommentsParams = ArticleIdParams & {
  articleId: string;
  limit: number;
  cursor?: number;
};

export interface ArticleCommentForm {
  content: string;
}

export type CreateArticleCommentRequest = ArticleCommentForm;

export type UpdateArticleCommentRequest = ArticleCommentForm;

export type DeleteArticleCommentRequest = void;

// 서버에서 클라이언트

export type GetArticleCommentsResponse = {
  nextCursor: number | null;
  list: ArticleComment[];
};

export type CreateArticleCommentResponse = ArticleComment;

export type UpdateArticleCommentResponse = ArticleComment;

export type DeleteArticleCommentResponse = {
  id: string;
};
