'use client';

import { useForm } from 'react-hook-form';

import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import FormField from '@/components/formField/FormField';

type ProfileUpdateFormValues = {
  nickname: string;
  imageFile: File | null;
};

const ProfileUpdateForm = () => {
  const profileUpdateForm = useForm<ProfileUpdateFormValues>({
    defaultValues: {
      nickname: '안해나',
      imageFile: null,
    },
  });

  const onSubmitProfile = (data: ProfileUpdateFormValues) => {
    console.log(data); //TODO: 콘솔 삭제
  };

  const profileErrors = profileUpdateForm.formState.errors;

  return (
    <form
      id="settings-profile-form"
      onSubmit={profileUpdateForm.handleSubmit(onSubmitProfile)}
      className="mt-8 flex flex-col gap-4 pb-6"
    >
      <figure className="mb-4 flex justify-center">
        <EditableProfileImage
          src="/images/default-profile.png"
          size="lg"
          onChange={(file) => profileUpdateForm.setValue('imageFile', file, { shouldDirty: true })}
        />
      </figure>

      <FormField
        id="settings-nickname"
        label="이름"
        placeholder="이름을 입력해주세요."
        isError={!!profileErrors.nickname}
        errorMessage={profileErrors.nickname?.message}
        {...profileUpdateForm.register('nickname', {
          required: '이름을 입력해주세요.',
        })}
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
