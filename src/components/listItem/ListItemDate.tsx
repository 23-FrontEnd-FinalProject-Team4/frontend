import CalendarIcon from '@/assets/icons/calendar.svg?react';
import RepeatIcon from '@/assets/icons/repeat.svg?react';
import { FREQUENCY_TEXT, ListItemDateProps } from './type';

const ListItemDate = ({ date, frequency }: ListItemDateProps) => {
  return (
    <div className="flex items-center">
      {/* Date */}
      <div className="flex items-center gap-1.5 border-r border-slate-700 pr-2">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
          <CalendarIcon width={16} height={16} />
        </span>
        <span>{date}</span>
      </div>

      {/* Recurring */}
      <div className="flex items-center gap-1.5 px-2">
        <RepeatIcon width={16} height={16} />
        <span>{FREQUENCY_TEXT[frequency]}</span>
      </div>
    </div>
  );
};

export default ListItemDate;
