'use server';

import { getErrorMessage } from '@/lib/error';
import { clearAuthTokens } from '@/utils/auth/token';

export type LogoutActionResult = { success: true } | { success: false; error: string };

export const logoutAction = async (): Promise<LogoutActionResult> => {
  try {
    await clearAuthTokens();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '로그아웃 중 오류가 발생했어요.'),
    };
  }
};
