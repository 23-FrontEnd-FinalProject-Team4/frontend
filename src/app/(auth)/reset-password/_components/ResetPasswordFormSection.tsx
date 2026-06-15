'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';
import { getErrorMessage } from '@/lib/error';
import { useResetPasswordMutation } from '@/queries/auth/queries';
import { type PasswordChangeFormValues, passwordChangeSchema } from '@/schemas/auth.schema';

interface ResetPasswordFormSectionProps {
  token?: string;
}

const ResetPasswordFormSection = ({ token }: ResetPasswordFormSectionProps) => {
  const router = useRouter();

  const { mutateAsync, isPending } = useResetPasswordMutation();

  const hasToken = Boolean(token);

  const resetPasswordForm = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const errors = resetPasswordForm.formState.errors;

  if (!hasToken) {
    return (
      <div className="flex flex-col gap-4 py-8 text-center">
        <p className="text-status-danger">유효하지 않은 비밀번호 재설정 링크입니다.</p>
        <Button type="button" onClick={() => router.push('/login')}>
          로그인으로 돌아가기
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: PasswordChangeFormValues) => {
    if (isPending) return;

    try {
      await mutateAsync({
        ...data,
        token: token as string,
      });
      toast.success('비밀번호가 재설정되었어요. 다시 로그인해주세요.');
      router.push('/login');
    } catch (error) {
      toast.error(getErrorMessage(error, '비밀번호 재설정 중 오류가 발생했어요.'));
    }
  };

  return (
    <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <FormField
        id="reset-password"
        label="새 비밀번호"
        type="password"
        placeholder="새 비밀번호를 입력해주세요."
        disabled={isPending}
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...resetPasswordForm.register('password')}
      />

      <FormField
        id="reset-password-confirmation"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        disabled={isPending}
        isError={!!errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
        {...resetPasswordForm.register('passwordConfirmation')}
      />

      <Button
        type="submit"
        className="my-4"
        disabled={isPending || !resetPasswordForm.formState.isValid}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        ) : (
          '비밀번호 재설정'
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordFormSection;
