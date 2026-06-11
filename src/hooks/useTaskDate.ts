import { formatISODate } from '@/utils/date';

import { useCustomSearchParams } from './useCustomSearchParams';

export const useTaskDate = () => {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const dateParam = searchParams.get('date');

  const selectedDate: Date = dateParam
    ? (() => {
        const [y, m, d] = dateParam.split('-').map(Number);
        return new Date(y, m - 1, d);
      })()
    : new Date();

  const setDate = (date: Date) => setSearchParams({ date: [formatISODate(date)] });

  return { selectedDate, setDate };
};
