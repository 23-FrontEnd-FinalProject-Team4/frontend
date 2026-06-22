import type { TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';

import type { TaskListItem, TaskStatus } from '../type';
import { getTaskDate, isTaskDone } from './taskStatus';

type TaskItemsByStatus = Record<TaskStatus, TaskListItem[]>;

const sortTasksByDate = (tasks: Task[]) =>
  [...tasks].sort((a, b) => (getTaskDate(a) ?? '').localeCompare(getTaskDate(b) ?? ''));

const createTaskListItem = (
  taskList: TaskList,
  tasks: Task[],
  status: TaskStatus,
  date?: string,
): TaskListItem => ({
  id: taskList.id,
  title: taskList.name,
  status,
  date,
  doneCount: tasks.filter(isTaskDone).length,
  totalCount: tasks.length,
  tasks: tasks.slice(0, 3).map((task) => ({
    id: task.id,
    title: task.name,
    done: isTaskDone(task),
  })),
});

export const createTaskItemsByStatus = (
  taskLists: TaskList[],
  today: string,
): TaskItemsByStatus => {
  return taskLists.reduce<TaskItemsByStatus>(
    (sections, taskList) => {
      const tasks = taskList.tasks ?? [];
      const todayTasks = tasks.filter((task) => {
        const taskDate = getTaskDate(task);

        if (!taskDate) return false;

        return taskDate === today || (taskDate < today && !isTaskDone(task));
      });
      const scheduledTasks = sortTasksByDate(
        tasks.filter((task) => {
          const taskDate = getTaskDate(task);
          return !isTaskDone(task) && taskDate !== undefined && taskDate > today;
        }),
      );
      const completedTasks = sortTasksByDate(tasks.filter(isTaskDone));
      const isTodayDone = todayTasks.length > 0 && todayTasks.every(isTaskDone);

      if (!isTodayDone) {
        sections.today.push(createTaskListItem(taskList, todayTasks, 'today', today));
      }

      if (scheduledTasks.length > 0) {
        sections.scheduled.push(
          createTaskListItem(taskList, scheduledTasks, 'scheduled', getTaskDate(scheduledTasks[0])),
        );
      }

      if (completedTasks.length > 0) {
        sections.done.push(
          createTaskListItem(taskList, completedTasks, 'done', getTaskDate(completedTasks[0])),
        );
      }

      return sections;
    },
    { today: [], scheduled: [], done: [] },
  );
};
