export type ArticleWrither = {
  id: number;
  name: string;
  profileImage?: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  image?: string;
  writer: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ArticleWithLike = Article & {
  isLiked: boolean;
};

export type ArticleCardProps = {
  article: ArticleWithLike;
  variant: 'best' | 'normal';
};
