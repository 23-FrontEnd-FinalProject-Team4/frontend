'use client';

import SecessionIcon from '@/assets/icons/secession.svg';
import Modal from '@/components/modal/Modal';

import { useDeleteAccount } from '../_hooks/useDeleteAccount';

const DeleteAccountSection = () => {
  const {
    isDeleteModalOpen,
    isDeletingAccount,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteAccount,
  } = useDeleteAccount();

  return (
    <>
      <button
        type="button"
        className="text-status-danger mt-4 flex items-center gap-1"
        onClick={openDeleteModal}
        disabled={isDeletingAccount}
      >
        <SecessionIcon aria-hidden />
        <span>회원 탈퇴하기</span>
      </button>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        variant="danger"
        title="회원 탈퇴를 진행하시겠어요?"
        description="탈퇴 시 계정 정보는 복구할 수 없습니다."
        primaryAction={{
          label: '회원 탈퇴',
          loadingLabel: '탈퇴 중',
          isLoading: isDeletingAccount,
          onClick: handleDeleteAccount,
        }}
        secondaryAction={{
          label: '취소',
          onClick: closeDeleteModal,
          disabled: isDeletingAccount,
        }}
      />
    </>
  );
};

export default DeleteAccountSection;
