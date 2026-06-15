'use server';

import { signIn } from '@/apis/auth/client';
import type { SignInRequest } from '@/apis/auth/type';
import { getErrorMessage } from '@/lib/error';
import { setAuthTokens } from '@/utils/auth/token';

export type LoginActionResult = { success: true } | { success: false; error: string };

export const loginAction = async (payload: SignInRequest): Promise<LoginActionResult> => {
  try {
    const { accessToken, refreshToken } = await signIn(payload);

    await setAuthTokens({
      accessToken,
      refreshToken,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '로그인 중 오류가 발생했어요.'),
    };
  }
};
