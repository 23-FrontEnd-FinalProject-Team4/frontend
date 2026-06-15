import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';
import { useUpdateTaskList } from '@/queries/taskList/queries';

interface AddTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
  title: string;
}

const EditTaskListModal = ({
  isOpen,
  onClose,
  groupId,
  taskListId,
  title,
}: AddTaskListModalProps) => {
  const [taskListName, setTaskListName] = useState(title);

  const router = useRouter();
  const { mutate, isPending } = useUpdateTaskList({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 목록"
      primaryAction={{
        label: '수정하기',
        onClick: () => {
          mutate({ groupId, id: String(taskListId), body: { name: taskListName } });
        },
        disabled: isPending || !taskListName,
      }}
      closeOnOverlayClick
    >
      <Input
        placeholder="목록명을 입력해주세요."
        value={taskListName}
        onChange={(e) => setTaskListName(e.target.value)}
      />
    </Modal>
  );
};

export default EditTaskListModal;
