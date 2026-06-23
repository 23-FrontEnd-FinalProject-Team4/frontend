import { TimeState } from '@/types/time';

export const createStartDate = (date: Date, time: TimeState): string => {
  const startDate = new Date(date);
  startDate.setHours(time.hour, time.minute, 0, 0);
  return startDate.toISOString();
};
