import DateItem from './DateItem';
import { getWeekDates } from '@/utils/getWeekDates';

interface DateListProps {
  selectedDate: Date;
  onChange?: (date: Date) => void;
}

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
