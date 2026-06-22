import { describe, expect, it } from 'vitest';

import type { TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';

import { createTaskItemsByStatus } from './taskSections';

const TODAY = '2026-06-22';

const createTask = (id: number, name: string, date: string, done = false): Task =>
  ({
    id,
    name,
    date,
    startDate: `${date}T00:00:00.000Z`,
    doneAt: done ? `${date}T09:00:00.000Z` : null,
    doneBy: null,
  }) as Task;

const createTaskList = (tasks: Task[]): TaskList =>
  ({
    id: 4,
    name: 'test 4',
    tasks,
  }) as TaskList;

describe('createTaskItemsByStatus', () => {
  it('keeps the list in today and also creates a scheduled card for future tasks', () => {
    const futureTask = createTask(26, 'Future task', '2026-06-26');

    const sections = createTaskItemsByStatus([createTaskList([futureTask])], TODAY);

    expect(sections.today).toEqual([
      expect.objectContaining({ id: 4, title: 'test 4', totalCount: 0, tasks: [] }),
    ]);
    expect(sections.scheduled).toEqual([
      expect.objectContaining({
        id: 4,
        title: 'test 4',
        date: '2026-06-26',
        totalCount: 1,
        tasks: [{ id: 26, title: 'Future task', done: false }],
      }),
    ]);
  });

  it('shows only today tasks inside the today card and future tasks inside the scheduled card', () => {
    const todayTask = createTask(22, 'Today task', TODAY);
    const futureTask = createTask(26, 'Future task', '2026-06-26');

    const sections = createTaskItemsByStatus([createTaskList([todayTask, futureTask])], TODAY);

    expect(sections.today[0]?.tasks).toEqual([{ id: 22, title: 'Today task', done: false }]);
    expect(sections.scheduled[0]?.tasks).toEqual([{ id: 26, title: 'Future task', done: false }]);
  });

  it('moves a list with only completed today tasks to done', () => {
    const doneTask = createTask(22, 'Done task', TODAY, true);

    const sections = createTaskItemsByStatus([createTaskList([doneTask])], TODAY);

    expect(sections.today).toEqual([]);
    expect(sections.done[0]).toEqual(
      expect.objectContaining({ id: 4, doneCount: 1, totalCount: 1 }),
    );
  });

  it('moves a completed future task from scheduled to done', () => {
    const doneFutureTask = createTask(26, 'Done future task', '2026-06-26', true);

    const sections = createTaskItemsByStatus([createTaskList([doneFutureTask])], TODAY);

    expect(sections.today).toEqual([
      expect.objectContaining({ id: 4, title: 'test 4', totalCount: 0, tasks: [] }),
    ]);
    expect(sections.scheduled).toEqual([]);
    expect(sections.done).toEqual([
      expect.objectContaining({
        id: 4,
        doneCount: 1,
        totalCount: 1,
        tasks: [{ id: 26, title: 'Done future task', done: true }],
      }),
    ]);
  });
});
