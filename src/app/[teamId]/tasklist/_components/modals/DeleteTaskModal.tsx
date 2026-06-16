import { useRouter } from 'next/navigation';

import { Task } from '@/apis/task/type';
import Modal from '@/components/modal/Modal';
import { useDeleteTask } from '@/queries/task/queries';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  groupId: number;
  taskListId: number;
}

const DeleteTaskModal = ({ isOpen, onClose, task, groupId, taskListId }: DeleteTaskModalProps) => {
  const router = useRouter();
  const { mutate, isPending } = useDeleteTask({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`'${task.name}' 할 일을 정말 삭제하시겠어요?`}
      description="삭제 후에는 되돌릴 수 없습니다."
      variant="danger"
      primaryAction={{
        label: '삭제하기',
        onClick: () => {
          mutate({ groupId, taskListId, taskId: task.id });
        },
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
