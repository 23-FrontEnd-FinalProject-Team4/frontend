'use server';

import { signIn } from '@/apis/auth';
import type { SignInRequest } from '@/apis/auth/type';
import type { Group } from '@/apis/user/type';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';
import { setAuthTokens } from '@/utils/auth/token';

export type LoginActionResult =
  | { success: true; redirectPath: string }
  | { success: false; error: string };

const getPostLoginRedirectPath = async (accessToken: string) => {
  const groups = await serverFetcher<Group[]>('/user/groups', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const firstGroupId = groups[0]?.id;

  return firstGroupId ? `/${firstGroupId}` : '/no-team';
};

export const loginAction = async (payload: SignInRequest): Promise<LoginActionResult> => {
  try {
    const { accessToken, refreshToken } = await signIn(payload);

    await setAuthTokens({
      accessToken,
      refreshToken,
    });

    const redirectPath = await getPostLoginRedirectPath(accessToken);

    return { success: true, redirectPath };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '로그인 중 오류가 발생했어요.'),
    };
  }
};
