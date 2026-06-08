export type CommentSectionProps = {
  comments: Comment[];
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
};
