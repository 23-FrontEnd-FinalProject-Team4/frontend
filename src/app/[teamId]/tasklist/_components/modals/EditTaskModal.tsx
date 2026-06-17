import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Task } from '@/apis/task/type';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import { getErrorMessage } from '@/lib/error';
import { useUpdateRecurringTask, useUpdateTask } from '@/queries/task/queries';

import { TaskFormValues, taskSchema } from '../../_schemas/task.schema';
import { createStartDate } from '../../_utils/date';
import { updateRecurringPayload } from '../../_utils/task';
import TaskForm from './TaskForm';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  groupId: number;
  taskListId: number;
}

const EditTaskModal = ({ isOpen, onClose, task, groupId, taskListId }: EditTaskModalProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const localDate = task.date ? new Date(task.date) : new Date();
  const hour = localDate.getHours();
  const minute = localDate.getMinutes();

  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: task.name,
      date: localDate,
      time: { hour, minute },
      frequency: task.frequency,
      description: task.description ?? '',
    },
  });

  const router = useRouter();
  const { mutateAsync: updateRecurringTask, isPending: isPendingRecurringTask } =
    useUpdateRecurringTask({});

  const { mutateAsync: updateTask, isPending: isPendingTask } = useUpdateTask({});

  const onSubmit = async (formValues: TaskFormValues) => {
    const startDate = createStartDate(formValues.date, formValues.time);
    const payload = updateRecurringPayload(formValues, startDate);

    try {
      await Promise.all([
        updateTask({
          groupId,
          taskListId,
          taskId: task.id,
          description: formValues.description ?? '',
          name: formValues.name,
        }),
        updateRecurringTask({
          groupId,
          taskListId,
          body: payload,
          recurringId: task.recurringId,
        }),
      ]);

      toast.success('할 일을 수정했습니다.');
      onClose();
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, '할 일을 수정하지 못했습니다.'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 수정"
      description="할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      size="lg"
      closeOnOverlayClick
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-6" onSubmit={methods.handleSubmit(onSubmit)}>
          <TaskForm submitButtonRef={submitButtonRef} />

          <Button
            variant="primary-filled"
            fullWidth
            ref={submitButtonRef}
            disabled={isPendingRecurringTask || isPendingTask}
          >
            수정하기
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditTaskModal;
