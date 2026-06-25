'use client';

import DateList from '@/components/dateList/DateList';
import { useTaskDate } from '@/hooks/useTaskDate';

import CalendarControl from './CalendarControl';

interface TaskListTitleProps {
  taskName?: string;
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
  const { selectedDate, setDate: handleChangeDate } = useTaskDate();

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="relative flex items-center justify-between gap-3 md:gap-10">
        {taskName ? (
          <div className="text-text-primary w-full flex-1 text-lg font-semibold wrap-break-word md:text-xl">
            {taskName}
          </div>
        ) : (
          <div className="w-full border-b border-slate-200 text-lg font-semibold text-slate-400 md:text-xl">
            할 일을 입력해주세요..
          </div>
        )}
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
