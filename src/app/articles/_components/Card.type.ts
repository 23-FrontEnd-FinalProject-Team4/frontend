export type ArticleWrither = {
  id: string;
  name: string;
  profileImage?: string;
};

export type Article = {
  id: string;
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
