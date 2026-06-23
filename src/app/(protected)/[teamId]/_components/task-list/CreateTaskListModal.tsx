'use client';

import { useState } from 'react';

import Modal from '@/components/modal/Modal';

interface CreateTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => boolean | void | Promise<boolean | void>;
}

const CreateTaskListModal = ({ isOpen, onClose, onCreate }: CreateTaskListModalProps) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const trimmedTitle = title.trim();

  const handleCreate = async () => {
    if (!trimmedTitle || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const shouldClose = await onCreate(trimmedTitle);

      if (shouldClose === false) {
        return;
      }

      setTitle('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();
    void handleCreate();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="할 일 목록"
      primaryAction={{
        label: '만들기',
        loadingLabel: '생성 중',
        onClick: handleCreate,
        disabled: !trimmedTitle || isSubmitting,
        isLoading: isSubmitting,
      }}
      size="md"
      onClose={onClose}
    >
      <input
        type="text"
        value={title}
        placeholder="목록 명을 입력해주세요."
        className="border-border-primary text-text-primary placeholder:text-text-disabled focus:border-brand-primary focus:ring-brand-primary h-11 w-full rounded-lg border px-4 text-sm transition-colors outline-none focus:ring-2"
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Modal>
  );
};

export default CreateTaskListModal;
