import { describe, expect, it } from 'vitest';

import type { Task } from '@/apis/task/type';

import { getTaskDate, isTaskDone } from './taskStatus';

type TaskStatusSource = Pick<Task, 'date' | 'doneAt' | 'doneBy' | 'startDate'>;

const createTask = (overrides: Partial<TaskStatusSource> = {}): TaskStatusSource => ({
  date: '2026-06-22',
  startDate: '2026-06-22T00:00:00.000Z',
  doneAt: null,
  doneBy: null,
  ...overrides,
});

describe('taskStatus', () => {
  describe('getTaskDate', () => {
    it('date가 있으면 해당 날짜를 반환한다', () => {
      expect(getTaskDate(createTask({ date: '2026-06-26' }))).toBe('2026-06-26');
    });

    it('date가 없으면 startDate를 서비스 시간대 날짜로 변환한다', () => {
      expect(getTaskDate(createTask({ date: null, startDate: '2026-06-24T15:00:00.000Z' }))).toBe(
        '2026-06-25',
      );
    });

    it('시간대가 포함된 ISO 문자열을 서비스 시간대 기준으로 분류한다', () => {
      expect(getTaskDate(createTask({ date: '2026-06-26T23:30:00.000-07:00' }))).toBe('2026-06-27');
    });

    it('유효한 날짜가 없으면 undefined를 반환한다', () => {
      expect(getTaskDate(createTask({ date: null, startDate: null }))).toBeUndefined();
      expect(getTaskDate(createTask({ date: 'invalid-date' }))).toBeUndefined();
    });
  });

  describe('isTaskDone', () => {
    it('완료 시각이나 완료 사용자가 있으면 완료로 판단한다', () => {
      expect(isTaskDone(createTask({ doneAt: '2026-06-22T09:00:00.000Z' }))).toBe(true);
      expect(
        isTaskDone(
          createTask({
            doneBy: { user: { id: 1, image: null, nickname: '완료한 사용자' } },
          }),
        ),
      ).toBe(true);
    });

    it('완료 정보가 없으면 미완료로 판단한다', () => {
      expect(isTaskDone(createTask())).toBe(false);
    });
  });
});
