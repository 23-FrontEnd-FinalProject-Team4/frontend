export type FrequencyType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface TaskPathParams {
  groupId: number;
  taskListId: number;
}

export interface TaskDetailPathParams extends TaskPathParams {
  taskId: number;
}

export interface UpdateTaskOrderPathParams extends TaskPathParams {
  id: number;
}

export interface DeleteRecurringTaskPathParams extends TaskDetailPathParams {
  recurringId: number;
}

export interface GetTasksRequest extends TaskPathParams {
  date?: string;
}

export interface CreateTaskRequest extends TaskPathParams {
  name: string;
  description: string;
  startDate: string;
  frequencyType: FrequencyType;
  monthDay?: number;
  weekDays?: number[];
}

export interface UpdateTaskRequest extends TaskDetailPathParams {
  name?: string;
  description?: string;
  done?: boolean;
}

export interface UpdateTaskOrderRequest extends UpdateTaskOrderPathParams {
  displayIndex: number;
}

export interface TaskUser {
  image: string;
  nickname: string;
  id: number;
}

export interface TaskDoneBy {
  user: TaskUser;
}

export interface Task {
  doneBy: TaskDoneBy | null;
  writer: TaskUser;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: FrequencyType;
  updatedAt: string;
  doneAt: string | null;
  startDate: string;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface RecurringTask {
  writerId: number;
  groupId: number;
  taskListId: number;
  monthDay: number;
  weekdays: number[];
  frequencyType: FrequencyType;
  updatedAt: string;
  createdAt: string;
  description: string;
  name: string;
  id: number;
  startDate: string;
}

export interface CreateTaskResponse {
  recurring: RecurringTask;
}
