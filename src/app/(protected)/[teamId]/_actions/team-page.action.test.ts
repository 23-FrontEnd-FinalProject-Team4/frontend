import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { GroupDetail, TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';
import { serverFetcher } from '@/lib/serverFetcher';

import { getTeamPageDataAction } from './team-page.action';

vi.mock('@/lib/serverFetcher', () => ({
  serverFetcher: vi.fn(),
}));

const createTaskList = (id: number, tasks: Task[] = []): TaskList => ({
  id,
  name: `Task list ${id}`,
  createdAt: '2026-06-22T00:00:00.000Z',
  updatedAt: '2026-06-22T00:00:00.000Z',
  groupId: 1,
  displayIndex: id,
  tasks,
});

describe('getTeamPageDataAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('예정된 할 일이 있는 날짜의 목록 상세를 조회해 팀 데이터에 합친다', async () => {
    const futureTask = {
      id: 10,
      name: 'Future task',
      date: '2026-06-26',
      startDate: '2026-06-26T00:00:00.000Z',
      doneAt: null,
      doneBy: null,
    } as Task;
    const groupSummary = {
      id: 1,
      name: 'Test team',
      taskLists: [createTaskList(11), createTaskList(12)],
    } as GroupDetail;

    vi.mocked(serverFetcher).mockImplementation(async (path) => {
      if (path === '/user/groups') return [] as never;
      if (path === '/user') return {} as never;
      if (path === '/groups/1') return groupSummary as never;
      if (path === '/groups/1/tasks?date=2026-06-26') return [futureTask] as never;
      if (path.startsWith('/groups/1/tasks?date=')) return [] as never;
      if (path === '/groups/1/task-lists/11?date=2026-06-26') {
        return createTaskList(11, [futureTask]) as never;
      }
      if (path === '/groups/1/task-lists/12?date=2026-06-26') {
        return createTaskList(12) as never;
      }

      throw new Error(`Unexpected request: ${path}`);
    });

    const result = await getTeamPageDataAction({ teamId: '1', date: '2026-06-22' });

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.group?.taskLists[0]?.tasks).toEqual([futureTask]);
    expect(serverFetcher).toHaveBeenCalledWith('/groups/1/tasks?date=2026-06-26');
    expect(serverFetcher).toHaveBeenCalledWith('/groups/1/task-lists/11?date=2026-06-26');
    expect(serverFetcher).toHaveBeenCalledWith('/groups/1/task-lists/12?date=2026-06-26');
  });
});
