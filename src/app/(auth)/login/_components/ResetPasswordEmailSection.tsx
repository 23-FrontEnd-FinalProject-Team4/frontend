'use client';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';
import { getErrorMessage } from '@/lib/error';
import { useSendResetPasswordEmailMutation } from '@/queries/auth/queries';
import { emailSchema } from '@/schemas/auth.schema';

interface ResetPasswordEmailSectionProps {
  defaultEmail?: string;
}

const ResetPasswordEmailSection = ({ defaultEmail = '' }: ResetPasswordEmailSectionProps) => {
  const { mutateAsync: sendResetPasswordEmail, isPending: isSendingResetEmail } =
    useSendResetPasswordEmailMutation();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');

  const handleForgotPasswordClick = () => {
    setResetEmail(defaultEmail);
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
        redirectUrl: `${window.location.origin}`,
      });
      toast.success('비밀번호 재설정 메일을 전송했어요.');
      closeResetModal();
    } catch (error) {
      toast.error(getErrorMessage(error, '비밀번호 재설정 메일 전송 중 오류가 발생했어요.'));
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-md text-brand-primary mb-4 text-right underline"
        onClick={handleForgotPasswordClick}
      >
        비밀번호를 잊으셨나요?
      </button>

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

export default ResetPasswordEmailSection;
