import { TaskHistory } from '@/apis/user/type';
import { formatISODate } from '@/utils/date';

export const groupDoneTasksByDate = (tasks: TaskHistory[]) => {
  const groupedTasks = Object.groupBy(tasks, (task) => formatISODate(new Date(task.date)));
  Object.entries(groupedTasks).sort(([dateStrA], [dateStrB]) => dateStrA.localeCompare(dateStrB));

  Object.values(groupedTasks).forEach((tasks) => {
    tasks?.sort((a, b) => a.displayIndex - b.displayIndex);
  });
  return groupedTasks;
};
