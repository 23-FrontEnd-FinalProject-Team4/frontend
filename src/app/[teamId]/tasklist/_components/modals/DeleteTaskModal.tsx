'use client';

import { toast } from 'react-hot-toast';

import { Task } from '@/apis/task/type';
import Modal from '@/components/modal/Modal';
import { getErrorMessage } from '@/lib/error';
import { useDeleteTask } from '@/queries/task/queries';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  groupId: number;
  taskListId: number;
}

const DeleteTaskModal = ({ isOpen, onClose, task, groupId, taskListId }: DeleteTaskModalProps) => {
  const { mutateAsync: deleteTask, isPending } = useDeleteTask();

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ groupId, taskListId, taskId: task.id });

      toast.success('할 일을 삭제했습니다.');
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, '할 일을 삭제하지 못했습니다.'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`'${task.name}' 할 일을 정말 삭제하시겠어요?`}
      description="삭제 후에는 되돌릴 수 없습니다."
      variant="danger"
      primaryAction={{
        label: '삭제하기',
        onClick: handleDeleteTask,
        disabled: isPending,
      }}
      secondaryAction={{
        label: '닫기',
        onClick: onClose,
      }}
    />
  );
};

export default DeleteTaskModal;
