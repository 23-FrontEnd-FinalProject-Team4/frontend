'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { Profile } from '@/apis/user/type';
import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import FormField from '@/components/formField/FormField';
import { type ProfileUpdateFormValues, profileUpdateSchema } from '@/schemas/auth.schema';

const DEFAULT_PROFILE_IMAGE = '/images/default-profile.png';

type ProfileUpdateFormProps = {
  initialProfile: Profile | null;
  onProfileChange: (isChanged: boolean) => void;
};

const ProfileUpdateForm = ({ initialProfile, onProfileChange }: ProfileUpdateFormProps) => {
  const {
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      nickname: initialProfile?.nickname ?? '',
      image: initialProfile?.image ?? DEFAULT_PROFILE_IMAGE,
    },
  });

  const nickname = watch('nickname');
  const profileImage = watch('image');

  useEffect(() => {
    reset({
      nickname: initialProfile?.nickname ?? '',
      image: initialProfile?.image ?? DEFAULT_PROFILE_IMAGE,
    });
  }, [initialProfile, reset]);

  useEffect(() => {
    const savedNickname = initialProfile?.nickname ?? '';
    const savedImage = initialProfile?.image ?? DEFAULT_PROFILE_IMAGE;
    const isChanged = nickname !== savedNickname || profileImage !== savedImage;

    onProfileChange(isChanged);
  }, [nickname, profileImage, initialProfile, onProfileChange]);

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
        value={initialProfile?.email ?? ''}
        placeholder="이메일을 입력해주세요."
        disabled
      />
    </div>
  );
};

export default ProfileUpdateForm;
