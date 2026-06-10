'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import FormField from '@/components/formField/FormField';

import {
  type PasswordChangeFormValues,
  passwordChangeSchema,
} from '../_schemas/password-change.schema';

const PasswordChangeForm = () => {
  const passwordChangeForm = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmitPassword = (data: PasswordChangeFormValues) => {
    console.log(data); //TODO: 콘솔 삭제
  };

  const passwordErrors = passwordChangeForm.formState.errors;

  return (
    <form
      id="settings-password-form"
      onSubmit={passwordChangeForm.handleSubmit(onSubmitPassword)}
      className="border-border-primary flex flex-col gap-4"
    >
      <FormField
        id="settings-password"
        label="비밀번호"
        type="password"
        placeholder="새 비밀번호를 입력해주세요."
        isError={!!passwordErrors.password}
        errorMessage={passwordErrors.password?.message}
        {...passwordChangeForm.register('password')}
      />

      <FormField
        id="settings-password-confirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        isError={!!passwordErrors.passwordConfirmation}
        errorMessage={passwordErrors.passwordConfirmation?.message}
        {...passwordChangeForm.register('passwordConfirmation')}
      />
    </form>
  );
};

export default PasswordChangeForm;
