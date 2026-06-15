import { useRef, useState } from 'react';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import CalendarDate from '@/components/calendar/date/CalendarDate';
import CalendarTime from '@/components/calendar/time/CalendarTime';
import DropdownMd from '@/components/dropdown/DropdownMd';
import Input from '@/components/input/Input';
import InputBox from '@/components/inputBox/InputBox';
import { FREQUENCY_TEXT } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { formatISODate } from '@/utils/date';

import { FREQUENCY_OPTIONS } from '../../_constants/options';
import { TaskFormValues } from '../../_schemas/task.schema';
import { getFrequencyEnumValue } from '../../_utils/task';
import WeekdayPicker from './WeekdayPicker';

const TaskForm = ({
  submitButtonRef,
}: {
  submitButtonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const [focusedInput, setFocusedInput] = useState<'date' | 'time' | null>(null);
  const focusRef = useRef(null);
  useOutsideClick(focusRef, (e) => {
    if (submitButtonRef.current?.contains(e.target as Node)) return;
    setFocusedInput(null);
  });

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TaskFormValues>();

  const [selectedDate, selectedTime, selectedFrequency] = useWatch({
    control,
    name: ['date', 'time', 'frequency'],
  });

  const formattedTime = `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')}`;

  return (
    <>
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
              options={FREQUENCY_OPTIONS}
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
    </>
  );
};

export default TaskForm;
