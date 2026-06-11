'use client';

import { useState } from 'react';

import Modal from '@/components/modal/Modal';

interface CreateTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (title: string) => void;
}

export default function CreateTaskListModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTaskListModalProps) {
  const [title, setTitle] = useState('');
  const trimmedTitle = title.trim();

  const handleCreate = () => {
    if (!trimmedTitle) {
      return;
    }

    onCreate?.(trimmedTitle);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="할 일 목록"
      primaryAction={{
        label: '만들기',
        onClick: handleCreate,
        disabled: !trimmedTitle,
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
      />
    </Modal>
  );
}
