'use client';

import Button from '@/components/button/Button';
import DateList from '@/components/dateList/DateList';
import PrevIcon from '@/assets/icons/arrow_left.svg?react';
import NextIcon from '@/assets/icons/arrow_right.svg?react';
import CalendarIcon from '@/assets/icons/calendar.svg?react';
import { useRef, useState } from 'react';
import CalendarDate from '@/components/calendar/date/CalendarDate';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TaskListTitleProps } from './type';
import { formatYearMonth } from '@/utils/date';

const TaskListTitle = ({
  taskName,
  selectedDate,
  onToday: handleToday,
  onPrevWeek: handlePrevWeek,
  onNextWeek: handleNextWeek,
  onChangeDate: handleChangeDate,
}: TaskListTitleProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const displayDate = formatYearMonth(selectedDate);

  const handleCalendarOpen = () => {
    setIsCalendarOpen(true);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => {
    setIsCalendarOpen(false);
  });

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="relative flex items-center justify-between">
        <div className="text-text-primary text-2lg font-bold wrap-break-word md:text-xl">
          {taskName}
        </div>
        <div className="relative flex items-center gap-2">
          <Button
            variant="secondary-filled"
            onClick={handleToday}
            aria-label="오늘"
            className="px-1 py-1 text-[8px] md:px-3 md:text-xs"
          >
            오늘
          </Button>
          <button
            type="button"
            aria-label="이전주"
            onClick={handlePrevWeek}
            className="flex items-center justify-center rounded-full border border-slate-200"
          >
            <PrevIcon width={12} height={12} viewBox="0 0 24 24" />
          </button>
          <div className="text-text-primary flex items-center text-sm font-medium md:text-lg">
            {displayDate}
          </div>
          <button
            type="button"
            aria-label="다음주"
            onClick={handleNextWeek}
            className="flex items-center justify-center rounded-full border border-slate-200"
          >
            <NextIcon width={12} height={12} viewBox="0 0 24 24" />
          </button>
          <Button
            variant="icon-circle-white"
            className="bg-background-secondary h-6 w-6"
            aria-label="달력 열기"
            icon={<CalendarIcon className="size-3" viewBox="0 0 16 16" />}
            onClick={handleCalendarOpen}
          />
          {isCalendarOpen && (
            <div className="z-calendar absolute top-10 right-[-20px] bg-white" ref={ref}>
              <CalendarDate selectedDate={selectedDate} setSelectedDate={handleChangeDate} />
            </div>
          )}
        </div>
      </div>
      <DateList selectedDate={selectedDate} onChange={handleChangeDate} />
    </div>
  );
};

export default TaskListTitle;
