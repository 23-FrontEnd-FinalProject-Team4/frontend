'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import FormField from '@/components/formField/FormField';

import {
  type ProfileUpdateFormValues,
  profileUpdateSchema,
} from '../_schemas/profile-update.schema';

const ProfileUpdateForm = () => {
  const profileUpdateForm = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nickname: '안해나',
      image: '/images/default-profile.png',
    },
  });
  const [profileImage, setProfileImage] = useState('/images/default-profile.png');

  const onSubmitProfile = (data: ProfileUpdateFormValues) => {
    console.log(data); //TODO: 콘솔 삭제
  };

  const profileErrors = profileUpdateForm.formState.errors;

  const handleProfileImageChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    profileUpdateForm.setValue('image', previewUrl, { shouldDirty: true, shouldValidate: true });
    setProfileImage(previewUrl);
  };

  return (
    <form
      id="settings-profile-form"
      onSubmit={profileUpdateForm.handleSubmit(onSubmitProfile)}
      className="mt-8 flex flex-col gap-4 pb-6"
    >
      <figure className="mb-4 flex justify-center">
        <EditableProfileImage src={profileImage} size="lg" onChange={handleProfileImageChange} />
      </figure>

      <FormField
        id="settings-nickname"
        label="이름"
        placeholder="이름을 입력해주세요."
        isError={!!profileErrors.nickname}
        errorMessage={profileErrors.nickname?.message}
        {...profileUpdateForm.register('nickname')}
      />

      <FormField
        id="settings-email"
        label="이메일"
        defaultValue="codeit@codeit.com"
        placeholder="이메일을 입력해주세요."
        disabled
      />
    </form>
  );
};

export default ProfileUpdateForm;
