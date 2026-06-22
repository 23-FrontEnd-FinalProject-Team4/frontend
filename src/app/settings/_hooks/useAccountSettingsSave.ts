'use client';

import { useCallback, useRef } from 'react';

import type { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { UpdateProfileRequest } from '@/apis/user/type';
import { uploadSettingsImageAction } from '@/app/settings/_actions/settings.action';
import { getErrorMessage } from '@/lib/error';
import { useChangePasswordMutation, useUpdateMyProfileMutation } from '@/queries/user/queries';
import type { AccountSettingsFormValues } from '@/schemas/auth.schema';

type UseAccountSettingsSaveParams = {
  isProfileChanged: boolean;
  isNicknameChanged: boolean;
  isImageChanged: boolean;
  hasPasswordValue: boolean;
  handleSubmit: UseFormHandleSubmit<AccountSettingsFormValues>;
  reset: UseFormReset<AccountSettingsFormValues>;
};

export const useAccountSettingsSave = ({
  isProfileChanged,
  isNicknameChanged,
  isImageChanged,
  hasPasswordValue,
  handleSubmit,
  reset,
}: UseAccountSettingsSaveParams) => {
  const updateProfileMutation = useUpdateMyProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();

  const selectedImageFileRef = useRef<File | null>(null);
  const setSelectedImageFile = useCallback((file: File | null) => {
    selectedImageFileRef.current = file;
  }, []);

  const isSaving = updateProfileMutation.isPending || changePasswordMutation.isPending;

  const saveProfile = async (values: AccountSettingsFormValues) => {
    const selectedImageFile = selectedImageFileRef.current;
    let savedImage = values.image;

    if (selectedImageFile) {
      const formData = new FormData();
      formData.append('image', selectedImageFile);

      const uploadResult = await uploadSettingsImageAction(formData);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      savedImage = uploadResult.data.url;
    }

    const payload: UpdateProfileRequest = {};

    if (isNicknameChanged) {
      payload.nickname = values.nickname;
    }

    if (selectedImageFile || isImageChanged) {
      payload.image = savedImage;
    }

    const shouldUpdateProfile = isNicknameChanged || isImageChanged || Boolean(selectedImageFile);

    if (shouldUpdateProfile) {
      await updateProfileMutation.mutateAsync(payload);
    }

    return savedImage;
  };

  const changePassword = async (values: AccountSettingsFormValues) => {
    await changePasswordMutation.mutateAsync({
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });
  };

  const handleSave = () => {
    void handleSubmit(async (values) => {
      try {
        const savedImage = isProfileChanged ? await saveProfile(values) : values.image;

        if (hasPasswordValue) {
          await changePassword(values);
        }

        selectedImageFileRef.current = null;

        reset({
          nickname: values.nickname,
          image: savedImage,
          password: '',
          passwordConfirmation: '',
        });

        toast.success('계정 설정이 저장되었어요.');
      } catch (error) {
        toast.error(getErrorMessage(error, '계정 설정 저장 중 오류가 발생했어요.'));
      }
    })();
  };

  return {
    handleSave,
    isSaving,
    setSelectedImageFile,
  };
};
