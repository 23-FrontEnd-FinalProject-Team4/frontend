export interface CommentPathParams {
  taskId: number;
}

export interface CommentDetailPathParams extends CommentPathParams {
  commentId: number;
}

export interface CreateCommentRequest extends CommentPathParams {
  content: string;
}

export interface UpdateCommentRequest extends CommentDetailPathParams {
  content: string;
}

export interface CommentUser {
  image: string | null;
  nickname: string;
  id: number;
}

export interface Comment {
  user: CommentUser;
  userId: number;
  taskId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}
