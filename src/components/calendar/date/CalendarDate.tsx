import { DayPicker } from '@daypicker/react';
import { ko } from '@daypicker/react/locale';
import '@daypicker/react/style.css';
import { useState } from 'react';
import { CalendarDateProps } from './type';

const CalendarDate = ({ selectedDate, setSelectedDate }: CalendarDateProps) => {
  const [month, setMonth] = useState(selectedDate);

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      required
      locale={ko}
      showOutsideDays
      defaultMonth={selectedDate}
      navLayout="around"
      classNames={{
        selected: 'bg-brand-primary rounded-lg text-white',
        day_button: `w-9 h-8`,
      }}
      className="border-interaction-hover z-calendar w-fit rounded-xl border p-4"
      disabled={{
        before: firstDay,
        after: lastDay,
      }}
      onMonthChange={setMonth}
    />
  );
};

export default CalendarDate;
