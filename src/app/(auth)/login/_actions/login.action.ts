'use server';

import axios from 'axios';

import { signIn } from '@/apis/Auth';
import type { SignInRequest } from '@/apis/Auth/type';
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
    if (axios.isAxiosError<{ message?: string }>(error)) {
      throw new Error(error.response?.data?.message ?? '로그인에 실패했어요.');
    }

    throw new Error('로그인 중 오류가 발생했어요.');
  }
};
