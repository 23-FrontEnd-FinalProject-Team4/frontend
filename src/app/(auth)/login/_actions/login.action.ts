'use server';

import { signIn } from '@/apis/Auth';
import type { SignInRequest } from '@/apis/Auth/type';
import { getAxiosErrorMessage } from '@/lib/error';
import { setAuthTokens } from '@/utils/auth/token';

export const loginAction = async (payload: SignInRequest) => {
  try {
    const { accessToken, refreshToken } = await signIn(payload);

    await setAuthTokens({
      accessToken,
      refreshToken,
    });

    return { success: true };
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, '로그인 중 오류가 발생했어요.'));
  }
};
