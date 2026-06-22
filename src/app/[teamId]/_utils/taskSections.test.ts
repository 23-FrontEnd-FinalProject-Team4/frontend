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
  it('오늘 카드와 미래 할 일이 담긴 예정 카드를 함께 만든다', () => {
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

  it('오늘 카드와 예정 카드에 해당 날짜의 할 일만 담는다', () => {
    const todayTask = createTask(22, 'Today task', TODAY);
    const futureTask = createTask(26, 'Future task', '2026-06-26');

    const sections = createTaskItemsByStatus([createTaskList([todayTask, futureTask])], TODAY);

    expect(sections.today[0]?.tasks).toEqual([{ id: 22, title: 'Today task', done: false }]);
    expect(sections.scheduled[0]?.tasks).toEqual([{ id: 26, title: 'Future task', done: false }]);
  });

  it('오늘 할 일을 모두 완료하면 완료 카드로 이동한다', () => {
    const doneTask = createTask(22, 'Done task', TODAY, true);

    const sections = createTaskItemsByStatus([createTaskList([doneTask])], TODAY);

    expect(sections.today).toEqual([]);
    expect(sections.done[0]).toEqual(
      expect.objectContaining({ id: 4, doneCount: 1, totalCount: 1 }),
    );
  });

  it('미래 할 일을 완료하면 예정 카드에서 완료 카드로 이동한다', () => {
    const doneFutureTask = createTask(26, 'Done future task', '2026-06-26', true);

    const sections = createTaskItemsByStatus([createTaskList([doneFutureTask])], TODAY);

    expect(sections.today).toEqual([
      expect.objectContaining({ id: 4, title: 'test 4', totalCount: 0, tasks: [] }),
    ]);
    expect(sections.scheduled).toEqual([]);
    expect(sections.done).toEqual([
      expect.objectContaining({
        id: 4,
        date: '2026-06-26',
        doneCount: 1,
        totalCount: 1,
        tasks: [{ id: 26, title: 'Done future task', done: true }],
      }),
    ]);
  });
});
