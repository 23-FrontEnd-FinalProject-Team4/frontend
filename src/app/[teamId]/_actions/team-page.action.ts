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
  type TeamPageQueryValues,
  type TeamUpdateValues,
  taskListCreateSchema,
  teamDeleteSchema,
  teamInvitationSchema,
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

const SCHEDULE_LOOKAHEAD_DAYS = 7;

const addDaysToISODate = (date: string, days: number) => {
  const nextDate = new Date(`${date}T00:00:00.000Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate.toISOString().slice(0, 10);
};

const getScheduledTaskDates = async (groupId: number, today?: string) => {
  if (!today) return [];

  const dates = Array.from({ length: SCHEDULE_LOOKAHEAD_DAYS }, (_, index) =>
    addDaysToISODate(today, index + 1),
  );
  const tasksByDate = await Promise.all(
    dates.map(async (date) => ({
      date,
      tasks: await serverFetcher<Task[]>(createGroupTasksPath(groupId, date)),
    })),
  );

  return tasksByDate.filter(({ tasks }) => tasks.length > 0).map(({ date }) => date);
};

const addScheduledTasksToTaskLists = async (
  groupId: number,
  taskLists: TaskList[],
  today?: string,
) => {
  const scheduledDates = await getScheduledTaskDates(groupId, today);

  if (scheduledDates.length === 0) return taskLists;

  const scheduledTaskLists = await Promise.all(
    scheduledDates.flatMap((date) =>
      taskLists.map((taskList) =>
        serverFetcher<TaskList>(
          `/groups/${groupId}/task-lists/${taskList.id}?date=${encodeURIComponent(date)}`,
        ),
      ),
    ),
  );

  return taskLists.map((taskList) => ({
    ...taskList,
    tasks: [
      ...(taskList.tasks ?? []),
      ...scheduledTaskLists
        .filter((scheduledTaskList) => scheduledTaskList.id === taskList.id)
        .flatMap((scheduledTaskList) => scheduledTaskList.tasks ?? []),
    ],
  }));
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
      const [myGroups, myProfile, groupSummary, todayTasks] = await Promise.all([
        serverFetcher<Group[]>('/user/groups'),
        serverFetcher<Profile>('/user'),
        serverFetcher<GroupDetail>(`/groups/${routeGroupId}`),
        serverFetcher<Task[]>(createGroupTasksPath(routeGroupId, date)),
      ]);
      const taskLists = await addScheduledTasksToTaskLists(
        routeGroupId,
        groupSummary.taskLists,
        date,
      );

      return {
        success: true,
        data: {
          myGroups,
          myProfile,
          selectedGroupId: routeGroupId,
          group: { ...groupSummary, taskLists },
          todayTasks,
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

    const [groupSummary, todayTasks] = await Promise.all([
      serverFetcher<GroupDetail>(`/groups/${selectedGroupId}`),
      serverFetcher<Task[]>(createGroupTasksPath(selectedGroupId, date)),
    ]);
    const taskLists = await addScheduledTasksToTaskLists(
      selectedGroupId,
      groupSummary.taskLists,
      date,
    );

    return {
      success: true,
      data: {
        myGroups,
        myProfile,
        selectedGroupId,
        group: { ...groupSummary, taskLists },
        todayTasks,
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
