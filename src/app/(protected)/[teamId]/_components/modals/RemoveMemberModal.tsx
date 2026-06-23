'use client';

import { useState } from 'react';

import Modal from '@/components/modal/Modal';

interface RemoveMemberModalProps {
  isOpen: boolean;
  memberName: string;
  onClose: () => void;
  onRemove: () => Promise<boolean>;
}

const RemoveMemberModal = ({ isOpen, memberName, onClose, onRemove }: RemoveMemberModalProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveMember = async () => {
    if (isRemoving) {
      return;
    }

    setIsRemoving(true);

    try {
      const shouldClose = await onRemove();

      if (shouldClose) {
        onClose();
      }
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="멤버 내보내기"
      description={`${memberName}님을 팀에서 내보내시겠어요?\n내보낸 멤버는 초대 링크로 다시 참여할 수 있습니다.`}
      primaryAction={{
        label: '내보내기',
        loadingLabel: '내보내는 중',
        onClick: handleRemoveMember,
        disabled: isRemoving,
        isLoading: isRemoving,
      }}
      secondaryAction={{
        label: '취소',
        onClick: onClose,
        disabled: isRemoving,
      }}
      variant="danger"
      size="md"
      closeOnOverlayClick={!isRemoving}
      onClose={onClose}
    />
  );
};

export default RemoveMemberModal;
