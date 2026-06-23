import { useState } from 'react';

import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';
import { useCreateTaskList } from '@/queries/taskList/queries';

interface AddTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
}

const AddTaskListModal = ({ isOpen, onClose, groupId }: AddTaskListModalProps) => {
  const [taskListName, setTaskListName] = useState('');

  const { mutate, isPending } = useCreateTaskList({
    onSuccess: onClose,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 목록"
      primaryAction={{
        label: '만들기',
        onClick: () => {
          mutate({ groupId, body: { name: taskListName } });
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

export default AddTaskListModal;
