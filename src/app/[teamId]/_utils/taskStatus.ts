import type { Task } from '@/apis/task/type';

import { formatISODate } from '../../../utils/date';

type TaskStatusSource = Pick<Task, 'date' | 'doneAt' | 'doneBy' | 'startDate'>;
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const isTaskDone = (task: TaskStatusSource) => Boolean(task.doneAt || task.doneBy?.user);

export const getTaskDate = (task: TaskStatusSource) => {
  const taskDate = task.date ?? task.startDate;

  if (!taskDate) {
    return undefined;
  }

  if (DATE_ONLY_PATTERN.test(taskDate)) {
    return taskDate;
  }

  const parsedDate = new Date(taskDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return formatISODate(parsedDate);
};
