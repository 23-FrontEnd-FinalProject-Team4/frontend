'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';

import { type LoginFormValues, loginSchema } from '../_schemas/login.schema';

const handleForgotPasswordClick = () => {};

const LoginFormSection = () => {
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const errors = loginForm.formState.errors;

  const onSubmit = (data: LoginFormValues) => {
    console.log(data); //TODO: 콘솔 삭제
  };

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <Button type="submit">로그인</Button>
    </form>
  );
};

export default LoginFormSection;
