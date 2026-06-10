export type ArticleDetail = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
};

export type ArticleHeaderProps = Pick<ArticleDetail, 'createdAt'> & {
  writer: ArticleDetail['writer'];
  title: string;
};

export type ArticleContentProps = {
  content: string;
  image?: string;
};

export type LikeButtonProps = {
  isLiked: boolean;
  likeCount: number;
  onLikeClick: () => void;
};
