'use server';

import type {
  ChangePasswordRequest,
  MessageResponse,
  Profile,
  UpdateProfileRequest,
} from '@/apis/user/type';
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

export const updateMyProfileAction = async (
  payload: UpdateProfileRequest,
): Promise<SettingsActionResult<MessageResponse>> => {
  try {
    const result = await serverFetcher<MessageResponse>('/user', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '프로필 정보를 수정하지 못했어요.'),
    };
  }
};

export const changePasswordAction = async (
  payload: ChangePasswordRequest,
): Promise<SettingsActionResult<MessageResponse>> => {
  try {
    const result = await serverFetcher<MessageResponse>('/user/password', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '비밀번호를 변경하지 못했어요.'),
    };
  }
};
