'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '@/queries/auth/queries';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';

import { type LoginFormValues, loginSchema } from '../_schemas/login.schema';

const handleForgotPasswordClick = () => {};

const LoginFormSection = () => {
  const loginMutation = useLoginMutation();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const errors = loginForm.formState.errors;

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <FormField
        id="login-email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        isError={!!errors.email}
        errorMessage={errors.email?.message}
        {...loginForm.register('email')}
      />

      <FormField
        id="login-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...loginForm.register('password')}
      />

      <button
        type="button"
        className="text-md text-brand-primary mb-4 text-right underline"
        onClick={handleForgotPasswordClick}
      >
        비밀번호를 잊으셨나요?
      </button>

      <Button type="submit" disabled={loginMutation.isPending || !loginForm.formState.isValid}>
        {loginMutation.isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        ) : (
          '로그인'
        )}
      </Button>
    </form>
  );
};

export default LoginFormSection;
