import { RequestCreateTaskRecurring, RequestUpdateTaskRecurring } from '@/apis/recurring/type';
import { FrequencyType } from '@/apis/task/type';
import { FREQUENCY_TEXT } from '@/constants/listItem';

import { TaskFormValues } from '../_schemas/task.schema';

export const getFrequencyEnumValue = (label: string): FrequencyType => {
  switch (label) {
    case FREQUENCY_TEXT.DAILY:
      return 'DAILY';
    case FREQUENCY_TEXT.WEEKLY:
      return 'WEEKLY';
    case FREQUENCY_TEXT.MONTHLY:
      return 'MONTHLY';
    default:
      return 'ONCE';
  }
};

export const createRecurringPayload = (
  formValues: TaskFormValues,
  startDate: string,
): RequestCreateTaskRecurring => {
  const { name, description, weekDays, frequency, date } = formValues;
  const basePayload = {
    name,
    description,
    startDate,
  };
  switch (frequency) {
    case 'WEEKLY':
      return {
        ...basePayload,
        frequencyType: 'WEEKLY',
        weekDays: weekDays ?? [],
      };
    case 'MONTHLY':
      return {
        ...basePayload,
        frequencyType: 'MONTHLY',
        monthDay: date.getDate(),
      };
    case 'DAILY':
      return {
        ...basePayload,
        frequencyType: 'DAILY',
      };
    case 'ONCE':
      return {
        ...basePayload,
        frequencyType: 'ONCE',
      };
  }
};

export const updateRecurringPayload = (
  formValues: TaskFormValues,
  startDate: string,
): RequestUpdateTaskRecurring => {
  const { name, description, weekDays, frequency, date } = formValues;
  return {
    name,
    description,
    startDate,
    weekDays,
    frequencyType: frequency,
    monthDay: date.getDate(),
  };
};
