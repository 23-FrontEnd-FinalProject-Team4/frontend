export type CommentSectionProps = {
  comments: Comment[] | null;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: string;
    nickname: string;
    image: string | null;
  };
};
