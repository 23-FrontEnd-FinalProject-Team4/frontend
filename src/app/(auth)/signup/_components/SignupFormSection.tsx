'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';
import { getErrorMessage } from '@/lib/error';
import { useSignupMutation } from '@/queries/auth/queries';
import { type SignupFormValues, signupSchema } from '@/schemas/auth.schema';

const SignupFormSection = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignupMutation();

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const errors = signupForm.formState.errors;

  const onSubmit = async (data: SignupFormValues) => {
    if (isPending) return;

    try {
      await mutateAsync(data);
      toast.success('회원가입이 완료되었어요.');
      router.push('/login');
    } catch (error) {
      toast.error(getErrorMessage(error, '회원가입 중 오류가 발생했어요.'));
    }
  };

  return (
    <form onSubmit={signupForm.handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <FormField
        id="signup-nickname"
        label="이름"
        placeholder="이름을 입력해주세요."
        disabled={isPending}
        isError={!!errors.nickname}
        errorMessage={errors.nickname?.message}
        {...signupForm.register('nickname')}
      />
      <FormField
        id="signup-email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        disabled={isPending}
        isError={!!errors.email}
        errorMessage={errors.email?.message}
        {...signupForm.register('email')}
      />

      <FormField
        id="signup-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        disabled={isPending}
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...signupForm.register('password')}
      />

      <FormField
        id="signup-password-confirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        disabled={isPending}
        isError={!!errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
        {...signupForm.register('passwordConfirmation')}
      />

      <Button type="submit" className="my-4" disabled={isPending || !signupForm.formState.isValid}>
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        ) : (
          '회원가입'
        )}
      </Button>
    </form>
  );
};

export default SignupFormSection;
