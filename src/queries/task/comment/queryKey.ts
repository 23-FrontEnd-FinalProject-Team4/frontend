interface TaskCommentKeyParams {
  taskId: number;
  commentId: number;
}

export const taskCommentKeys = {
  all: ({ taskId }: Pick<TaskCommentKeyParams, 'taskId'>) => ['comment', taskId] as const,
  detail: ({ taskId, commentId }: TaskCommentKeyParams) =>
    [...taskCommentKeys.all({ taskId }), commentId] as const,
};
