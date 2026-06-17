'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { Profile } from '@/apis/user/type';
import { uploadSettingsImageAction } from '@/app/settings/_actions/settings.action';
import SecessionIcon from '@/assets/icons/secession.svg';
import Modal from '@/components/modal/Modal';
import { getErrorMessage } from '@/lib/error';
import {
  useChangePasswordMutation,
  useDeleteMyAccountMutation,
  useUpdateMyProfileMutation,
} from '@/queries/user/queries';
import { type AccountSettingsFormValues, accountSettingsSchema } from '@/schemas/auth.schema';

import PasswordChangeForm from './PasswordChangeForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import SettingSaveBar from './SettingSaveBar';

type AccountSettingFormProps = {
  initialProfile: Profile | null;
};

const DEFAULT_PROFILE_IMAGE = '/images/default-profile.png';

const AccountSettingForm = ({ initialProfile }: AccountSettingFormProps) => {
  const router = useRouter();

  const updateProfileMutation = useUpdateMyProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const deleteMyAccountMutation = useDeleteMyAccountMutation();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const isSaveBarVisible = isProfileChanged || hasPasswordValue;
  const isSaving = updateProfileMutation.isPending || changePasswordMutation.isPending;
  const isDeletingAccount = deleteMyAccountMutation.isPending;

  const handleDeleteAccount = async () => {
    if (isDeletingAccount) {
      return;
    }

    try {
      await deleteMyAccountMutation.mutateAsync();
      toast.success('회원 탈퇴가 완료되었어요.');
      setIsDeleteModalOpen(false);
      router.replace('/login');
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, '회원 탈퇴 중 오류가 발생했어요.'));
    }
  };

  const handleSave = handleSubmit(async (values) => {
    try {
      let savedImage = values.image;

      if (isProfileChanged) {
        if (selectedImageFile) {
          const formData = new FormData();
          formData.append('image', selectedImageFile);
          const uploadResult = await uploadSettingsImageAction(formData);

          if (!uploadResult.success) {
            throw new Error(uploadResult.error);
          }

          savedImage = uploadResult.data.url;
        }

        await updateProfileMutation.mutateAsync({
          nickname: values.nickname,
          image: savedImage,
        });

        setSelectedImageFile(null);
        reset({
          ...values,
          image: savedImage,
        });
      }

      if (hasPasswordValue) {
        await changePasswordMutation.mutateAsync({
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        });
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

        <button
          type="button"
          className="text-status-danger mt-4 flex items-center gap-1"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isDeletingAccount}
        >
          <SecessionIcon aria-hidden />
          <span>회원 탈퇴하기</span>
        </button>
      </section>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        variant="danger"
        title="회원 탈퇴를 진행하시겠어요?"
        description="탈퇴 시 계정 정보는 복구할 수 없습니다."
        primaryAction={{
          label: '회원 탈퇴',
          loadingLabel: '탈퇴 중',
          isLoading: isDeletingAccount,
          onClick: handleDeleteAccount,
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setIsDeleteModalOpen(false),
          disabled: isDeletingAccount,
        }}
      />

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
