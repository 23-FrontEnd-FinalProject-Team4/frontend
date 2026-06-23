'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import { getErrorMessage } from '@/lib/error';
import { useCreateTask } from '@/queries/task/queries';

import { TaskFormValues, taskSchema } from '../../_schemas/task.schema';
import { createStartDate } from '../../_utils/date';
import { createRecurringPayload } from '../../_utils/task';
import TaskForm from './TaskForm';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
}

const AddTaskModal = ({ isOpen, onClose, groupId, taskListId }: AddTaskModalProps) => {
  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      time: { hour: 0, minute: 0 },
      frequency: 'ONCE',
      description: '',
    },
    mode: 'onBlur',
  });

  const { mutateAsync: createTask, isPending } = useCreateTask();

  const handleSubmit = async (formValues: TaskFormValues) => {
    const startDate = createStartDate(formValues.date, formValues.time);
    const payload = createRecurringPayload(formValues, startDate);

    try {
      await createTask({ groupId, taskListId, body: payload });

      toast.success('할 일을 만들었습니다.');
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, '할 일을 만들지 못했습니다.'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 만들기"
      description="할 일을 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      size="lg"
      closeOnOverlayClick
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-6" onSubmit={methods.handleSubmit(handleSubmit)}>
          <TaskForm />

          <Button variant="primary-filled" fullWidth disabled={isPending}>
            만들기
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddTaskModal;
