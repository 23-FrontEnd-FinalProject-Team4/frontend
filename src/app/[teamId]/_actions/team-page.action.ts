'use server';

import type { GroupDetail } from '@/apis/group/type';
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

export const getTeamPageDataAction = async (
  payload: TeamPageQueryValues,
): Promise<TeamPageActionResult<TeamPageData>> => {
  const parsedPayload = teamPageQuerySchema.safeParse(payload);

  if (!parsedPayload.success) {
    return toValidationError(parsedPayload.error.issues[0]?.message);
  }

  try {
    const { teamId, date } = parsedPayload.data;
    const [myGroups, myProfile] = await Promise.all([
      serverFetcher<Group[]>('/user/groups'),
      serverFetcher<Profile>('/user'),
    ]);
    const selectedGroupId = getRouteGroupId(teamId) ?? myGroups[0]?.id;

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

    const [group, todayTasks] = await Promise.all([
      serverFetcher<GroupDetail>(`/groups/${selectedGroupId}`),
      serverFetcher<Task[]>(
        `/groups/${selectedGroupId}/tasks${date ? `?date=${encodeURIComponent(date)}` : ''}`,
      ),
    ]);

    return {
      success: true,
      data: {
        myGroups,
        myProfile,
        selectedGroupId,
        group,
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
