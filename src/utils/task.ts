import { Task } from '@/apis/task/type';

export const groupedDoneTasks = (tasks: Task[]) =>
  tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (task.doneAt) {
      const dateKey = task.doneAt.split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
    }
    return acc;
  }, {});

export const getDoneTasksByDate = (tasks: Task[]) =>
  Object.entries(groupedDoneTasks(tasks)).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime(),
  );
