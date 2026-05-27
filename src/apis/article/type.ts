export interface ArticleWriter {
  id: number;
  nickname: string;
  image: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: ArticleWriter;
}

export interface ArticleDetail extends Article {
  isLiked: boolean;
}

// 클라이언트에서 서버

export type ArticleOrder = 'recent' | 'like';

export interface GetArticlesParams {
  page: number;
  pageSize: number;
  orderBy: ArticleOrder;
}

export interface ArticleForm {
  title: string;
  content: string;
  image: string;
}

export type CreateArticleRequest = ArticleForm;

export type UpdateArticleRequest = ArticleForm;

// 서버에서 클라이언트
export interface GetArticlesResponse {
  totalCount: number;
  list: Article[];
}
