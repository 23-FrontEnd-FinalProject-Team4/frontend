interface TaskListKeyParams {
  groupId: number;
  taskListId: string;
  date?: string;
}

export const taskListKeys = {
  all: ({ groupId }: Pick<TaskListKeyParams, 'groupId'>) => ['task-list', groupId] as const,
  date: ({ groupId, taskListId, date }: TaskListKeyParams) =>
    [...taskListKeys.all({ groupId }), taskListId, date] as const,
};
