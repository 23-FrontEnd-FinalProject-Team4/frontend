import type { Task } from '@/apis/task/type';

type TaskStatusSource = Pick<Task, 'date' | 'doneAt' | 'doneBy' | 'startDate'>;
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SERVICE_TIME_ZONE = 'Asia/Seoul';

const formatServiceDate = (date: Date) => {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: SERVICE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((part) => part.type === type)?.value;

  return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
};

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

  return formatServiceDate(parsedDate);
};
