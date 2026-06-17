'use client';

import { useState } from 'react';

import type { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { uploadSettingsImageAction } from '@/app/settings/_actions/settings.action';
import { getErrorMessage } from '@/lib/error';
import { useChangePasswordMutation, useUpdateMyProfileMutation } from '@/queries/user/queries';
import type { AccountSettingsFormValues } from '@/schemas/auth.schema';

type UseAccountSettingsSaveParams = {
  isProfileChanged: boolean;
  hasPasswordValue: boolean;
  handleSubmit: UseFormHandleSubmit<AccountSettingsFormValues>;
  reset: UseFormReset<AccountSettingsFormValues>;
};

export const useAccountSettingsSave = ({
  isProfileChanged,
  hasPasswordValue,
  handleSubmit,
  reset,
}: UseAccountSettingsSaveParams) => {
  const updateProfileMutation = useUpdateMyProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const isSaving = updateProfileMutation.isPending || changePasswordMutation.isPending;

  const saveProfile = async (values: AccountSettingsFormValues) => {
    let image = values.image;

    if (selectedImageFile) {
      const formData = new FormData();
      formData.append('image', selectedImageFile);

      const uploadResult = await uploadSettingsImageAction(formData);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      image = uploadResult.data.url;
    }

    await updateProfileMutation.mutateAsync({
      nickname: values.nickname,
      image,
    });

    return image;
  };

  const changePassword = async (values: AccountSettingsFormValues) => {
    await changePasswordMutation.mutateAsync({
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });
  };

  const handleSave = handleSubmit(async (values) => {
    try {
      let savedImage = values.image;

      if (isProfileChanged) {
        savedImage = await saveProfile(values);
        setSelectedImageFile(null);
        reset({
          ...values,
          image: savedImage,
        });
      }

      if (hasPasswordValue) {
        await changePassword(values);
      }

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
  });

  return {
    handleSave,
    isSaving,
    setSelectedImageFile,
  };
};
