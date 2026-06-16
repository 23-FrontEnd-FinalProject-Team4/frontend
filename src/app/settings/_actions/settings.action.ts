'use server';

import type { Profile } from '@/apis/user/type';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';

type SettingsActionResult<T> = { success: true; data: T } | { success: false; error: string };

export const getMyProfileAction = async (): Promise<SettingsActionResult<Profile>> => {
  try {
    const profile = await serverFetcher<Profile>('/user');

    return {
      success: true,
      data: profile,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '프로필 정보를 불러오지 못했어요.'),
    };
  }
};
