import { useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Task } from '@/apis/task/type';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
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

  const { mutateAsync: mutateRecurringTaskAsync, isPending: isPendingRecurringTask } =
    useUpdateRecurringTask();

  const { mutateAsync: mutateTaskAsync, isPending: isPendingTask } = useUpdateTask();

  const handleSubmit = async (formValues: TaskFormValues) => {
    const startDate = createStartDate(formValues.date, formValues.time);
    const payload = updateRecurringPayload(formValues, startDate);

    await mutateTaskAsync({
      groupId,
      taskListId,
      taskId: task.id,
      description: formValues.description ?? '',
      name: formValues.name,
    });
    await mutateRecurringTaskAsync({
      groupId,
      taskListId,
      body: payload,
      recurringId: task.recurringId,
    });
    onClose();
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
        <form className="flex flex-col gap-6" onSubmit={methods.handleSubmit(handleSubmit)}>
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
