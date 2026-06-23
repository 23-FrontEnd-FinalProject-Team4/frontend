'use client';

import { useState } from 'react';

import Modal from '@/components/modal/Modal';

interface DeleteTeamModalProps {
  isOpen: boolean;
  teamName: string;
  onClose: () => void;
  onDelete: () => Promise<boolean>;
}

const DeleteTeamModal = ({ isOpen, teamName, onClose, onDelete }: DeleteTeamModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTeam = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const shouldClose = await onDelete();

      if (shouldClose) {
        onClose();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="팀 삭제"
      description={`${teamName} 팀을 삭제하시겠어요?\n삭제한 팀은 다시 복구할 수 없습니다.`}
      primaryAction={{
        label: '삭제하기',
        loadingLabel: '삭제 중',
        onClick: handleDeleteTeam,
        disabled: isDeleting,
        isLoading: isDeleting,
      }}
      secondaryAction={{
        label: '취소',
        onClick: onClose,
        disabled: isDeleting,
      }}
      variant="danger"
      size="md"
      closeOnOverlayClick={!isDeleting}
      onClose={onClose}
    />
  );
};

export default DeleteTeamModal;
