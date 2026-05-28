'use client';

import { useState } from 'react';
import { DateItem } from './DateItem';
import { getWeekDates } from '@/utils/getWeekDates';

const DateList = ({ selectedDate }: { selectedDate: Date }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const days = getWeekDates(currentDate);

  return (
    <div className="flex w-full gap-3">
      {days.map((day) => (
        <DateItem
          key={day.toISOString()}
          date={day}
          isSelected={day.getTime() === currentDate.getTime()}
          onClick={() => {
            setCurrentDate(day);
          }}
        />
      ))}
    </div>
  );
};

export default DateList;
