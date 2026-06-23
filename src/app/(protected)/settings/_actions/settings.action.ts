'use server';

import { uploadImageServer } from '@/apis/image/server';
import type { UploadImageResponse } from '@/apis/image/type';
import {
  changePasswordServer,
  deleteMyAccountServer,
  getMyProfileServer,
  updateMyProfileServer,
} from '@/apis/user/server';
import type {
  ChangePasswordRequest,
  MessageResponse,
  Profile,
  UpdateProfileRequest,
} from '@/apis/user/type';
import { getErrorMessage } from '@/lib/error';
import { clearAuthTokens } from '@/utils/auth/token';

type SettingsActionResult<T> = { success: true; data: T } | { success: false; error: string };

export const getMyProfileAction = async (): Promise<SettingsActionResult<Profile>> => {
  try {
    const profile = await getMyProfileServer();

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
    const result = await updateMyProfileServer(payload);

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
    const result = await changePasswordServer(payload);

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

export const uploadSettingsImageAction = async (
  formData: FormData,
): Promise<SettingsActionResult<UploadImageResponse>> => {
  try {
    const result = await uploadImageServer(formData);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '이미지를 업로드하지 못했어요.'),
    };
  }
};

export const deleteMyAccountAction = async (): Promise<SettingsActionResult<MessageResponse>> => {
  try {
    const result = await deleteMyAccountServer();

    await clearAuthTokens();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '회원 탈퇴에 실패했어요.'),
    };
  }
};
