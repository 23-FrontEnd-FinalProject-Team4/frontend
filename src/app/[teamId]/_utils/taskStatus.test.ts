import { describe, expect, it } from 'vitest';

import type { Task } from '@/apis/task/type';

import { getTaskListStatus } from './taskStatus';

type TaskStatusSource = Pick<Task, 'date' | 'doneAt' | 'doneBy' | 'startDate'>;

const TODAY = '2026-06-22';

const createTask = ({
  date = TODAY,
  startDate = date,
  done = false,
}: {
  date?: string | null;
  startDate?: string | null;
  done?: boolean;
} = {}): TaskStatusSource => ({
  date,
  startDate,
  doneAt: done ? `${TODAY}T09:00:00` : null,
  doneBy: done ? { user: { id: 1, image: null, nickname: '완료한 사용자' } } : null,
});

describe('getTaskListStatus', () => {
  it('할 일이 없으면 오늘 상태를 반환한다', () => {
    expect(getTaskListStatus([], TODAY)).toBe('today');
  });

  it('모든 할 일이 완료되면 완료 상태를 반환한다', () => {
    expect(getTaskListStatus([createTask({ done: true })], TODAY)).toBe('done');
  });

  it('미완료 할 일이 모두 미래 일정이면 예정됨 상태를 반환한다', () => {
    expect(getTaskListStatus([createTask({ date: '2026-06-23' })], TODAY)).toBe('scheduled');
  });

  it('일정 날짜가 없으면 시작 날짜를 기준으로 예정됨 상태를 반환한다', () => {
    const task = createTask({ date: null, startDate: '2026-06-23' });

    expect(getTaskListStatus([task], TODAY)).toBe('scheduled');
  });

  it('오늘 할 일이 하나라도 남아 있으면 오늘 상태를 반환한다', () => {
    const tasks = [createTask(), createTask({ date: '2026-06-23' })];

    expect(getTaskListStatus(tasks, TODAY)).toBe('today');
  });

  it('완료된 오늘 할 일과 미완료 미래 일정만 있으면 예정됨 상태를 반환한다', () => {
    const tasks = [createTask({ done: true }), createTask({ date: '2026-06-23' })];

    expect(getTaskListStatus(tasks, TODAY)).toBe('scheduled');
  });

  it('날짜를 확인할 수 없는 미완료 할 일은 오늘 상태로 유지한다', () => {
    expect(getTaskListStatus([createTask({ date: null })], TODAY)).toBe('today');
  });
});
