'use client';

import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import FormField from '@/components/formField/FormField';
import type { AccountSettingsFormValues } from '@/schemas/auth.schema';

const PasswordChangeForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSettingsFormValues>();

  return (
    <div className="border-border-primary flex flex-col gap-1">
      <FormField
        id="settings-password"
        label="비밀번호"
        type="password"
        placeholder="새 비밀번호를 입력해주세요."
        disabled={!isEditing}
        rightButtonText={!isEditing ? '변경하기' : undefined}
        onRightButtonClick={() => setIsEditing(true)}
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password')}
      />

      <FormField
        id="settings-password-confirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        disabled={!isEditing}
        isError={!!errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
        {...register('passwordConfirmation')}
      />
    </div>
  );
};

export default PasswordChangeForm;
