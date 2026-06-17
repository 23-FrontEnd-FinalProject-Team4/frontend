'use client';

import { useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
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
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      time: { hour: 0, minute: 0 },
      frequency: 'ONCE',
      description: '',
    },
  });

  const { mutate, isPending } = useCreateTask({
    onSuccess: onClose,
  });

  const handleSubmit = (formValues: TaskFormValues) => {
    const startDate = createStartDate(formValues.date, formValues.time);
    const payload = createRecurringPayload(formValues, startDate);

    mutate({ groupId, taskListId, body: payload });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 만들기"
      description="할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      size="lg"
      closeOnOverlayClick
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-6" onSubmit={methods.handleSubmit(handleSubmit)}>
          <TaskForm submitButtonRef={submitButtonRef} />

          <Button variant="primary-filled" fullWidth ref={submitButtonRef} disabled={isPending}>
            만들기
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddTaskModal;
