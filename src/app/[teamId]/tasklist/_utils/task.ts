import { RequestCreateTaskRecurring } from '@/apis/recurring/type';
import { FrequencyType } from '@/apis/task/type';
import { FREQUENCY_TEXT } from '@/constants/listItem';

import { AddTaskFormValues } from '../_schemas/addTask.schema';

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
  formValues: AddTaskFormValues,
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
