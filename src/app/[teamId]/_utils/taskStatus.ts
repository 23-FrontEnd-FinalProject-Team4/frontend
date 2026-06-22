import type { Task } from '@/apis/task/type';

import { formatISODate } from '../../../utils/date';
import type { TaskStatus } from '../type';

type TaskStatusSource = Pick<Task, 'date' | 'doneAt' | 'doneBy' | 'startDate'>;
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const isTaskDone = (task: TaskStatusSource) => Boolean(task.doneAt || task.doneBy?.user);

const getTaskDate = (task: TaskStatusSource) => {
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

const isFutureTask = (task: TaskStatusSource, today: string) => {
  const taskDate = getTaskDate(task);
  return taskDate !== undefined && taskDate > today;
};

export const getTaskListStatus = (
  tasks: readonly TaskStatusSource[],
  today: string,
): TaskStatus => {
  if (tasks.length === 0) {
    return 'today';
  }

  const incompleteTasks = tasks.filter((task) => !isTaskDone(task));

  if (incompleteTasks.length === 0) {
    return 'done';
  }

  return incompleteTasks.every((task) => isFutureTask(task, today)) ? 'scheduled' : 'today';
};
