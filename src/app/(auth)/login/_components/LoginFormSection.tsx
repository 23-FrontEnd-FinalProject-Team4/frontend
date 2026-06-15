'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';
import { getErrorMessage } from '@/lib/error';
import { useLoginMutation } from '@/queries/auth/queries';
import { type LoginFormValues, loginSchema } from '@/schemas/auth.schema';

import ResetPasswordEmailSection from './ResetPasswordEmailSection';

const LoginFormSection = () => {
  const router = useRouter();

  const { mutateAsync, isPending } = useLoginMutation();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const errors = loginForm.formState.errors;

  const onSubmit = async (data: LoginFormValues) => {
    if (isPending) return;

    try {
      await mutateAsync(data);
      toast.success('로그인에 성공했어요.');
      router.push('/');
    } catch (error) {
      toast.error(getErrorMessage(error, '로그인 중 오류가 발생했어요.'));
    }
  };

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <FormField
        id="login-email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        disabled={isPending}
        isError={!!errors.email}
        errorMessage={errors.email?.message}
        {...loginForm.register('email')}
      />

      <FormField
        id="login-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        disabled={isPending}
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...loginForm.register('password')}
      />

      <ResetPasswordEmailSection defaultEmail={loginForm.getValues('email') ?? ''} />

      <Button type="submit" disabled={isPending || !loginForm.formState.isValid}>
        {isPending ? (
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
