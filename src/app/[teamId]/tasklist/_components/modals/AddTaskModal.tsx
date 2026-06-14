'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Button from '@/components/button/Button';
import CalendarDate from '@/components/calendar/date/CalendarDate';
import CalendarTime from '@/components/calendar/time/CalendarTime';
import DropdownMd from '@/components/dropdown/DropdownMd';
import Input from '@/components/input/Input';
import InputBox from '@/components/inputBox/InputBox';
import Modal from '@/components/modal/Modal';
import { FREQUENCY_TEXT } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useCreateTask } from '@/queries/task/queries';
import { formatISODate } from '@/utils/date';

import { OPTIONS } from '../../_constants/options';
import { AddTaskFormValues, addTaskSchema } from '../../_schemas/addTask.schema';
import { createStartDate } from '../../_utils/date';
import { createRecurringPayload, getFrequencyEnumValue } from '../../_utils/task';
import WeekdayPicker from './WeekdayPicker';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
}

const AddTaskModal = ({ isOpen, onClose, groupId, taskListId }: AddTaskModalProps) => {
  const [focusedInput, setFocusedInput] = useState<'date' | 'time' | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const focusRef = useRef(null);
  useOutsideClick(focusRef, (e) => {
    if (submitButtonRef.current?.contains(e.target as Node)) return;
    setFocusedInput(null);
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      time: { hour: 0, minute: 0 },
      frequency: 'ONCE',
      description: '',
    },
  });

  const [selectedDate, selectedTime, selectedFrequency] = useWatch({
    control,
    name: ['date', 'time', 'frequency'],
  });

  const formattedTime = `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')}`;

  const router = useRouter();
  const { mutate } = useCreateTask({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit = (formValues: AddTaskFormValues) => {
    const startDate = createStartDate(formValues.date, formValues.time);
    const payload = createRecurringPayload(formValues, startDate);

    mutate({ groupId, taskListId, body: payload });
    onClose();
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
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <label htmlFor="task-name" className="text-text-primary text-lg font-medium">
            할 일 제목
            <span className="text-status-danger ml-1">*</span>
          </label>
          <Input
            id="task-name"
            type="text"
            placeholder="할 일 제목을 입력해 주세요"
            className="min-w-0"
            isError={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name')}
          />
        </div>

        <div className="flex flex-col gap-4" ref={focusRef}>
          <label htmlFor="task-start-date" className="text-text-primary text-lg font-medium">
            시작 날짜 및 시간
            <span className="text-status-danger ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              id="task-start-date"
              type="text"
              value={formatISODate(selectedDate)}
              placeholder="YYYY년 MM월 DD일"
              onClick={() => setFocusedInput('date')}
              readOnly
            />
            <Input
              id="task-start-time"
              type="text"
              value={formattedTime}
              placeholder="0:00"
              onClick={() => setFocusedInput('time')}
              readOnly
            />
          </div>

          {focusedInput === 'date' && (
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <CalendarDate selectedDate={field.value} setSelectedDate={field.onChange} />
              )}
            />
          )}
          {focusedInput === 'time' && (
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <CalendarTime selectedTime={field.value} setSelectedTime={field.onChange} />
              )}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-text-primary text-lg font-medium">반복 설정</label>
          <Controller
            control={control}
            name="frequency"
            render={({ field }) => (
              <DropdownMd
                options={OPTIONS}
                onSelect={(selectedLabel) => {
                  field.onChange(getFrequencyEnumValue(selectedLabel));
                }}
              >
                {FREQUENCY_TEXT[field.value]}
              </DropdownMd>
            )}
          />
        </div>

        {selectedFrequency === 'WEEKLY' && (
          <div className="flex flex-col gap-4">
            <label className="text-text-primary text-lg font-medium">반복 요일</label>
            <Controller
              control={control}
              name="weekDays"
              render={({ field }) => (
                <WeekdayPicker selectedDays={field.value ?? []} onChange={field.onChange} />
              )}
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <label htmlFor="task-description" className="text-text-primary text-lg font-medium">
            할 일 메모
          </label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <InputBox
                id="task-description"
                placeholder="할 일에 대한 메모를 남겨주세요"
                className="w-full min-w-0"
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>

        <Button variant="primary-filled" fullWidth disabled={isSubmitting} ref={submitButtonRef}>
          만들기
        </Button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
