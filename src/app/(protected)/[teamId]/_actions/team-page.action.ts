'use server';

import type { GroupDetail, TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';
import type { Group, Profile } from '@/apis/user/type';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';
import {
  type TaskListCreateValues,
  type TeamDeleteValues,
  type TeamInvitationValues,
  type TeamMemberDeleteValues,
  type TeamPageQueryValues,
  type TeamUpdateValues,
  taskListCreateSchema,
  teamDeleteSchema,
  teamInvitationSchema,
  teamMemberDeleteSchema,
  teamPageQuerySchema,
  teamUpdateSchema,
} from '@/schemas/team.schema';

type TeamPageActionResult<T> = { success: true; data: T } | { success: false; error: string };

interface TeamPageData {
  myGroups: Group[];
  myProfile: Profile;
  selectedGroupId?: number;
  group?: GroupDetail;
  todayTasks: Task[];
}

const toValidationError = (message?: string): TeamPageActionResult<never> => ({
  success: false,
  error: message ?? '입력값을 다시 확인해주세요.',
});

const getRouteGroupId = (teamId: string) => {
  const groupId = Number(teamId);
  return Number.isSafeInteger(groupId) && groupId > 0 ? groupId : undefined;
};

const createGroupTasksPath = (groupId: number, date?: string) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  return `/groups/${groupId}/tasks${query}`;
};

const createTaskListPath = (groupId: number, taskListId: number, date: string) => {
  return `/groups/${groupId}/task-lists/${taskListId}?date=${encodeURIComponent(date)}`;
};

const mergeTasksById = (...taskGroups: Task[][]) => {
  return Array.from(new Map(taskGroups.flat().map((task) => [task.id, task])).values());
};

// API가 날짜별 조회만 지원하고 그룹 할 일에는 목록 ID가 없으므로,
// 할 일이 있는 날짜를 먼저 좁힌 뒤 목록 상세를 조회한다.
const TASK_LOOKAROUND_DAYS = 7;

const addDaysToISODate = (date: string, days: number) => {
  const nextDate = new Date(`${date}T00:00:00.000Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate.toISOString().slice(0, 10);
};

const getRelatedTaskDates = async (groupId: number, today?: string) => {
  if (!today) return [];

  const dateOffsets = Array.from(
    { length: TASK_LOOKAROUND_DAYS * 2 + 1 },
    (_, index) => index - TASK_LOOKAROUND_DAYS,
  ).filter((offset) => offset !== 0);
  const dates = dateOffsets.map((offset) => addDaysToISODate(today, offset));
  const tasksByDate = await Promise.all(
    dates.map(async (date) => ({
      date,
      tasks: await serverFetcher<Task[]>(createGroupTasksPath(groupId, date)),
    })),
  );

  return tasksByDate.filter(({ tasks }) => tasks.length > 0).map(({ date }) => date);
};

const addRelatedTasksToTaskLists = async (
  groupId: number,
  taskLists: TaskList[],
  today?: string,
) => {
  const relatedDates = await getRelatedTaskDates(groupId, today);

  if (relatedDates.length === 0) return taskLists;

  const relatedTaskLists = await Promise.all(
    relatedDates.flatMap((date) =>
      taskLists.map((taskList) =>
        serverFetcher<TaskList>(createTaskListPath(groupId, taskList.id, date)),
      ),
    ),
  );
  return taskLists.map((taskList) => ({
    ...taskList,
    tasks: mergeTasksById(
      taskList.tasks ?? [],
      relatedTaskLists
        .filter((relatedTaskList) => relatedTaskList.id === taskList.id)
        .flatMap((relatedTaskList) => relatedTaskList.tasks ?? []),
    ),
  }));
};

const getGroupPageData = async (groupId: number, date?: string) => {
  const [groupSummary, todayTasks] = await Promise.all([
    serverFetcher<GroupDetail>(`/groups/${groupId}`),
    serverFetcher<Task[]>(createGroupTasksPath(groupId, date)),
  ]);
  const taskLists = await addRelatedTasksToTaskLists(groupId, groupSummary.taskLists, date);

  return {
    group: { ...groupSummary, taskLists },
    todayTasks,
  };
};

export const getTeamPageDataAction = async (
  payload: TeamPageQueryValues,
): Promise<TeamPageActionResult<TeamPageData>> => {
  const parsedPayload = teamPageQuerySchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    const { teamId, date } = parsedPayload.data;
    const routeGroupId = getRouteGroupId(teamId);

    if (routeGroupId) {
      const [myGroups, myProfile, groupPageData] = await Promise.all([
        serverFetcher<Group[]>('/user/groups'),
        serverFetcher<Profile>('/user'),
        getGroupPageData(routeGroupId, date),
      ]);

      return {
        success: true,
        data: {
          myGroups,
          myProfile,
          selectedGroupId: routeGroupId,
          ...groupPageData,
        },
      };
    }

    const [myGroups, myProfile] = await Promise.all([
      serverFetcher<Group[]>('/user/groups'),
      serverFetcher<Profile>('/user'),
    ]);
    const selectedGroupId = myGroups[0]?.id;

    if (!selectedGroupId) {
      return {
        success: true,
        data: {
          myGroups,
          myProfile,
          todayTasks: [],
        },
      };
    }

    const groupPageData = await getGroupPageData(selectedGroupId, date);

    return {
      success: true,
      data: {
        myGroups,
        myProfile,
        selectedGroupId,
        ...groupPageData,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '팀 페이지 정보를 불러오지 못했습니다.'),
    };
  }
};

export const getTeamInvitationAction = async (
  payload: TeamInvitationValues,
): Promise<TeamPageActionResult<string>> => {
  const parsedPayload = teamInvitationSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    const invitationLink = await serverFetcher<string>(
      `/groups/${parsedPayload.data.groupId}/invitation`,
    );

    return { success: true, data: invitationLink };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '초대 링크를 불러오지 못했습니다.'),
    };
  }
};

export const createTeamTaskListAction = async (
  payload: TaskListCreateValues,
): Promise<TeamPageActionResult<void>> => {
  const parsedPayload = taskListCreateSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    const { groupId, name } = parsedPayload.data;

    await serverFetcher(`/groups/${groupId}/task-lists`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '할 일 목록을 생성하지 못했습니다.'),
    };
  }
};

export const updateTeamAction = async (
  payload: TeamUpdateValues,
): Promise<TeamPageActionResult<GroupDetail>> => {
  const parsedPayload = teamUpdateSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    const { groupId, image, name } = parsedPayload.data;
    const group = await serverFetcher<GroupDetail>(`/groups/${groupId}`, {
      method: 'PATCH',
      body: JSON.stringify({ image, name }),
    });

    return { success: true, data: group };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '팀 정보를 수정하지 못했습니다.'),
    };
  }
};

export const deleteTeamAction = async (
  payload: TeamDeleteValues,
): Promise<TeamPageActionResult<void>> => {
  const parsedPayload = teamDeleteSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    await serverFetcher(`/groups/${parsedPayload.data.groupId}`, {
      method: 'DELETE',
    });

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '팀을 삭제하지 못했습니다.'),
    };
  }
};

export const deleteTeamMemberAction = async (
  payload: TeamMemberDeleteValues,
): Promise<TeamPageActionResult<void>> => {
  const parsedPayload = teamMemberDeleteSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    const { groupId, memberUserId } = parsedPayload.data;

    await serverFetcher(`/groups/${groupId}/member/${memberUserId}`, {
      method: 'DELETE',
    });

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '멤버를 내보내지 못했습니다.'),
    };
  }
};
