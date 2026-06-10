'use client';

import DateList from '@/components/dateList/DateList';
import CalendarControl from './CalendarControl';
import { formatISODate } from '@/utils/date';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface TaskListTitleProps {
  taskName: string;
  onToday: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

const TaskListTitle = ({
  taskName,
  onToday: handleToday,
  onPrevWeek: handlePrevWeek,
  onNextWeek: handleNextWeek,
}: TaskListTitleProps) => {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const dateParams = searchParams.get('date');
  const selectedDate = dateParams ? new Date(dateParams) : new Date();

  const handleChangeDate = (newDate: Date) => {
    setSearchParams({ date: [formatISODate(newDate)] });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="relative flex items-center justify-between">
        <div className="text-text-primary text-2lg font-bold wrap-break-word md:text-xl">
          {taskName}
        </div>
        <CalendarControl
          handleToday={handleToday}
          handlePrev={handlePrevWeek}
          handleNext={handleNextWeek}
          selectedDate={selectedDate}
          handleChangeDate={handleChangeDate}
        />
      </div>
      <DateList selectedDate={selectedDate} onChange={handleChangeDate} />
    </div>
  );
};

export default TaskListTitle;
