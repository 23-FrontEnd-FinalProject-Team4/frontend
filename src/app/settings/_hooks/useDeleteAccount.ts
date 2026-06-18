'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'react-hot-toast';

import { getErrorMessage } from '@/lib/error';
import { useDeleteMyAccountMutation } from '@/queries/user/queries';

export const useDeleteAccount = () => {
  const router = useRouter();

  const deleteMyAccountMutation = useDeleteMyAccountMutation();

  const isDeletingAccount = deleteMyAccountMutation.isPending;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    if (isDeletingAccount) {
      return;
    }

    try {
      await deleteMyAccountMutation.mutateAsync();
      toast.success('회원 탈퇴가 완료되었어요.');
      closeDeleteModal();
      router.replace('/login');
    } catch (error) {
      toast.error(getErrorMessage(error, '회원 탈퇴 중 오류가 발생했어요.'));
    }
  };

  return {
    isDeleteModalOpen,
    isDeletingAccount,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteAccount,
  };
};
