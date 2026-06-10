'use client';

import { useForm } from 'react-hook-form';

import FormField from '@/components/formField/FormField';

type PasswordChangeFormValues = {
  password: string;
  passwordConfirmation: string;
};

const PasswordChangeForm = () => {
  const passwordChangeForm = useForm<PasswordChangeFormValues>({
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
      className="border-border-primary flex flex-col gap-4 border-t pt-6"
    >
      <FormField
        id="settings-password"
        label="비밀번호"
        type="password"
        placeholder="새 비밀번호를 입력해주세요."
        isError={!!passwordErrors.password}
        errorMessage={passwordErrors.password?.message}
        {...passwordChangeForm.register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '비밀번호는 8자 이상 입력해주세요.',
          },
        })}
      />

      <FormField
        id="settings-confirm-password"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        isError={!!passwordErrors.passwordConfirmation}
        errorMessage={passwordErrors.passwordConfirmation?.message}
        {...passwordChangeForm.register('passwordConfirmation', {
          required: '비밀번호 확인을 입력해주세요.',
          validate: (value) =>
            value === passwordChangeForm.getValues('password') || '비밀번호가 일치하지 않습니다.',
        })}
      />
    </form>
  );
};

export default PasswordChangeForm;
