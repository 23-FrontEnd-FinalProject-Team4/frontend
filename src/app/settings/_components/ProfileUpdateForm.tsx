'use client';

import { useEffect } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import FormField from '@/components/formField/FormField';
import type { AccountSettingsFormValues } from '@/schemas/auth.schema';

type ProfileUpdateFormProps = {
  email: string;
};

const ProfileUpdateForm = ({ email }: ProfileUpdateFormProps) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<AccountSettingsFormValues>();

  const profileImage = useWatch({
    control,
    name: 'image',
  });

  useEffect(() => {
    return () => {
      if (profileImage?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleProfileImageChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);

    setValue('image', previewUrl, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="mt-8 flex flex-col gap-1 pb-1">
      <figure className="mb-4 flex justify-center">
        <EditableProfileImage src={profileImage} size="lg" onChange={handleProfileImageChange} />
      </figure>

      <FormField
        id="settings-nickname"
        label="이름"
        placeholder="이름을 입력해주세요."
        isError={!!errors.nickname}
        errorMessage={errors.nickname?.message}
        {...register('nickname')}
      />

      <FormField
        id="settings-email"
        label="이메일"
        value={email}
        placeholder="이메일을 입력해주세요."
        disabled
      />
    </div>
  );
};

export default ProfileUpdateForm;
