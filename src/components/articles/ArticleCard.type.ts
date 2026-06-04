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

export type ArticleCardProps = {
  article: Article;
  variant?: 'best' | 'normal';
};
