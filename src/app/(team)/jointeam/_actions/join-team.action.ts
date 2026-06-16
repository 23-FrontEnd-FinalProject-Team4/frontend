'use server';

import type { Profile } from '@/apis/user/type';
import {
  JOIN_TEAM_ERROR_CODE,
  type JoinTeamErrorCode,
} from '@/app/(team)/jointeam/join-team.error';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';
import { teamJoinSchema } from '@/schemas/team.schema';
import { parseInvitationLink } from '@/utils/team/parseInvitationLink';

export type JoinTeamActionResult =
  | { success: true; data: { groupId: number } }
  | { success: false; error: string; code: JoinTeamErrorCode };

export const joinTeamAction = async (payload: {
  teamLink: string;
}): Promise<JoinTeamActionResult> => {
  const parsedPayload = teamJoinSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: parsedPayload.error.issues[0]?.message ?? '입력값을 다시 확인해주세요.',
      code: JOIN_TEAM_ERROR_CODE.VALIDATION,
    };
  }

  const invitation = parseInvitationLink(parsedPayload.data.teamLink);

  if (!invitation) {
    return {
      success: false,
      error: '올바른 팀 링크를 입력해주세요.',
      code: JOIN_TEAM_ERROR_CODE.INVALID_LINK,
    };
  }

  try {
    let userEmail = invitation.userEmail;

    if (!userEmail) {
      const profile = await serverFetcher<Profile>('/user');
      userEmail = profile.email;
    }

    const { groupId } = await serverFetcher<{ groupId: number }>('/groups/accept-invitation', {
      method: 'POST',
      body: JSON.stringify({
        userEmail,
        token: invitation.token,
      }),
    });

    return { success: true, data: { groupId } };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '팀 참여 중 오류가 발생했어요.'),
      code: JOIN_TEAM_ERROR_CODE.API,
    };
  }
};
