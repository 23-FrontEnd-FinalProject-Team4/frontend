'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import type { Profile } from '@/apis/user/type';
import { type AccountSettingsFormValues, accountSettingsSchema } from '@/schemas/auth.schema';

import { useAccountSettingsSave } from '../_hooks/useAccountSettingsSave';
import DeleteAccountSection from './DeleteAccountSection';
import PasswordChangeForm from './PasswordChangeForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import SettingSaveBar from './SettingSaveBar';

type AccountSettingFormProps = {
  initialProfile: Profile | null;
};

const DEFAULT_PROFILE_IMAGE = '/images/default-profile.png';

const AccountSettingForm = ({ initialProfile }: AccountSettingFormProps) => {
  const form = useForm<AccountSettingsFormValues>({
    resolver: zodResolver(accountSettingsSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: initialProfile?.nickname ?? '',
      image: initialProfile?.image ?? DEFAULT_PROFILE_IMAGE,
      password: '',
      passwordConfirmation: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = form;

  const password = useWatch({ control, name: 'password' });
  const passwordConfirmation = useWatch({ control, name: 'passwordConfirmation' });

  const isProfileChanged = Boolean(dirtyFields.nickname || dirtyFields.image);
  const hasPasswordValue = Boolean(password || passwordConfirmation);

  const { handleSave, isSaving, setSelectedImageFile } = useAccountSettingsSave({
    isProfileChanged,
    hasPasswordValue,
    handleSubmit,
    reset,
  });

  const isSaveBarVisible = isProfileChanged || hasPasswordValue;

  return (
    <FormProvider {...form}>
      <section className="bg-background-primary w-full max-w-[780px] rounded-2xl p-8 md:p-12">
        <h1 className="text-medium font-semibold">계정 설정</h1>
        <ProfileUpdateForm
          email={initialProfile?.email ?? ''}
          onImageFileSelect={(file) => {
            setSelectedImageFile(file);
          }}
        />
        <PasswordChangeForm />
        <DeleteAccountSection />
      </section>

      {isSaveBarVisible && (
        <div className="w-full max-w-[780px]">
          <SettingSaveBar
            description="변경사항이 있습니다."
            buttonText={isSaving ? '저장 중' : '저장하기'}
            disabled={!isSaveBarVisible || isSaving}
            onSave={handleSave}
          />
        </div>
      )}
    </FormProvider>
  );
};

export default AccountSettingForm;
