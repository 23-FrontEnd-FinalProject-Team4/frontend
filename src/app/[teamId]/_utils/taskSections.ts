import type { TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';

import type { TaskListItem, TaskStatus } from '../type';
import { getTaskDate, isTaskDone } from './taskStatus';

type TaskItemsByStatus = Record<TaskStatus, TaskListItem[]>;

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
      const todayTasks = tasks.filter((task) => getTaskDate(task) === today);
      const scheduledTasks = tasks
        .filter((task) => {
          const taskDate = getTaskDate(task);
          return !isTaskDone(task) && taskDate !== undefined && taskDate > today;
        })
        .sort((a, b) => (getTaskDate(a) ?? '').localeCompare(getTaskDate(b) ?? ''));
      const completedTasks = tasks.filter(isTaskDone);
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
        sections.done.push(createTaskListItem(taskList, completedTasks, 'done'));
      }

      return sections;
    },
    { today: [], scheduled: [], done: [] },
  );
};
