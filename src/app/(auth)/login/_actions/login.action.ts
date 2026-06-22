'use server';

import { signIn } from '@/apis/auth';
import type { SignInRequest } from '@/apis/auth/type';
import { getPostLoginRedirectPath } from '@/lib/auth/postLoginRedirect';
import { getErrorMessage } from '@/lib/error';
import { setAuthTokens } from '@/utils/auth/token';

export type LoginActionResult =
  | { success: true; redirectPath: string }
  | { success: false; error: string };

export const loginAction = async (
  payload: SignInRequest,
  redirectPath?: string,
): Promise<LoginActionResult> => {
  try {
    const { accessToken, refreshToken } = await signIn(payload);

    await setAuthTokens({
      accessToken,
      refreshToken,
    });

    const resolvedRedirectPath = await getPostLoginRedirectPath({ accessToken, redirectPath });

    return { success: true, redirectPath: resolvedRedirectPath };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '로그인 중 오류가 발생했어요.'),
    };
  }
};
