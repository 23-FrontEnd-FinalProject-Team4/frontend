import DateItem from '../dateItem1/DateItem';
import { getWeekDates } from '@/utils/date/getWeekDates';
import { DateListProps } from './type';

const DateList = ({ selectedDate, onChange }: DateListProps) => {
  const days = getWeekDates(selectedDate);

  return (
    <div className="flex w-full gap-3">
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
