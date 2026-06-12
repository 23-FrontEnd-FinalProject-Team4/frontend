export type ArticleWriter = {
  id: string;
  nickname: string;
  image: string;
};

export type Article = {
  id: string;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: ArticleWriter;
};

export type ArticleDetail = Article & {
  isLiked: boolean;
};

// 클라이언트에서 서버

export type ArticleOrder = 'recent' | 'like';

export type GetArticlesParams = {
  page: number;
  pageSize: number;
  orderBy: ArticleOrder;
  keyword?: string;
};

export type ArticleForm = {
  title: string;
  content: string;
  image?: string | null;
};

export type CreateArticleRequest = ArticleForm;

export type UpdateArticleRequest = ArticleForm;

// 서버에서 클라이언트
export type GetArticlesResponse = {
  totalCount: number;
  list: Article[];
};
