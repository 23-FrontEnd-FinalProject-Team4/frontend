export interface TaskKeyParams {
  groupId: number;
  taskListId: number;
  date: string;
  taskId: number;
}

export const taskKeys = {
  all: ['task'] as const,
  taskList: ({ groupId, taskListId }: Pick<TaskKeyParams, 'groupId' | 'taskListId'>) =>
    [...taskKeys.all, groupId, taskListId] as const,
  date: ({ groupId, taskListId, date }: Omit<TaskKeyParams, 'taskId'>) =>
    [...taskKeys.taskList({ groupId, taskListId }), date] as const,
  detail: ({ groupId, taskListId, taskId }: Omit<TaskKeyParams, 'date'>) =>
    [...taskKeys.taskList({ groupId, taskListId }), taskId] as const,
  history: () => [...taskKeys.all, 'history'] as const,
};
