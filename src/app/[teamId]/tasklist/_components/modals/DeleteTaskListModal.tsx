import { useRouter } from 'next/navigation';

import Modal from '@/components/modal/Modal';
import { useDeleteTaskList } from '@/queries/taskList/queries';

interface DeleteTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
  taskListName: string;
}

const DeleteTaskListModal = ({
  isOpen,
  onClose,
  groupId,
  taskListId,
  taskListName,
}: DeleteTaskListModalProps) => {
  const router = useRouter();
  const { mutate } = useDeleteTaskList({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`'${taskListName}' 할 일 목록을 정말 삭제하시겠어요?`}
      description="삭제 후에는 되돌릴 수 없습니다."
      variant="danger"
      primaryAction={{
        label: '삭제하기',
        onClick: () => {
          mutate({ groupId, id: String(taskListId) });
        },
      }}
      secondaryAction={{
        label: '닫기',
        onClick: onClose,
      }}
    />
  );
};

export default DeleteTaskListModal;
