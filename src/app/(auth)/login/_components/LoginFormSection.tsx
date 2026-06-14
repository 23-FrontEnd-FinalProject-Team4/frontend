'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';
import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';
import { getErrorMessage } from '@/lib/error';
import { useLoginMutation, useSendResetPasswordEmailMutation } from '@/queries/auth/queries';
import { type LoginFormValues, emailSchema, loginSchema } from '@/schemas/auth.schema';

const LoginFormSection = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useLoginMutation();
  const { mutateAsync: sendResetPasswordEmail, isPending: isSendingResetEmail } =
    useSendResetPasswordEmailMutation();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const errors = loginForm.formState.errors;

  const handleForgotPasswordClick = () => {
    setResetEmail(loginForm.getValues('email') ?? '');
    setResetEmailError('');
    setIsResetModalOpen(true);
  };

  const closeResetModal = () => {
    setResetEmailError('');
    setIsResetModalOpen(false);
  };

  const handleResetPasswordConfirm = async () => {
    if (isSendingResetEmail) return;

    const validatedEmail = emailSchema.safeParse(resetEmail);

    if (!validatedEmail.success) {
      setResetEmailError(validatedEmail.error.issues[0]?.message ?? '이메일 형식을 확인해주세요.');
      return;
    }

    try {
      await sendResetPasswordEmail({
        email: validatedEmail.data,
        redirectUrl: `${window.location.origin}/reset-password`,
      });
      toast.success('비밀번호 재설정 메일을 전송했어요.');
      closeResetModal();
    } catch (error) {
      toast.error(getErrorMessage(error, '비밀번호 재설정 메일 전송 중 오류가 발생했어요.'));
    }
  };

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
    <>
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

        <button
          type="button"
          className="text-md text-brand-primary mb-4 text-right underline"
          onClick={handleForgotPasswordClick}
        >
          비밀번호를 잊으셨나요?
        </button>

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

      <Modal
        isOpen={isResetModalOpen}
        title="비밀번호 재설정"
        description="비밀번호 재설정 링크를 보내드립니다."
        size="md"
        primaryAction={{
          label: '링크 보내기',
          onClick: handleResetPasswordConfirm,
          disabled: !resetEmail.trim(),
          isLoading: isSendingResetEmail,
          loadingLabel: '전송 중...',
        }}
        secondaryAction={{
          label: '닫기',
          onClick: closeResetModal,
          disabled: isSendingResetEmail,
        }}
        onClose={closeResetModal}
      >
        <Input
          type="email"
          aria-label="비밀번호 재설정 이메일"
          placeholder="이메일을 입력하세요."
          value={resetEmail}
          isError={!!resetEmailError}
          errorMessage={resetEmailError}
          disabled={isSendingResetEmail}
          onChange={(event) => {
            setResetEmail(event.target.value);
            if (resetEmailError) {
              setResetEmailError('');
            }
          }}
        />
      </Modal>
    </>
  );
};

export default LoginFormSection;
