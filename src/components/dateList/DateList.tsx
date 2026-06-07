import { getWeekDatesAround } from '@/utils/date';

import DateItem from '../dateItem/DateItem';
import { DateListProps } from './type';

const DateList = ({ selectedDate, onChange }: DateListProps) => {
  const days = getWeekDatesAround(selectedDate);

  return (
    <div className="flex w-full gap-1 md:gap-2 xl:gap-3">
      {days.map((day) => (
        <DateItem
          key={day.toISOString()}
          date={day}
          isSelected={day.getTime() === selectedDate.getTime()}
          onClick={onChange}
        />
      ))}
    </div>
  );
};

export default DateList;
