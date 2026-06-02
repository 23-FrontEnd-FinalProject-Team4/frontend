import { generateHoursByInterval, generateMinutesByInterval } from '@/utils/date/date';
import Button from '@/components/button/Button';
import { CalendarTimeProps } from './type';

const CalendarTime = ({
  selectedHour = 0,
  setSelectedHour,
  selectedMinute = 0,
  setSelectedMinute,
}: CalendarTimeProps) => {
  const hours = generateHoursByInterval();
  const minutes = generateMinutesByInterval(30);

  return (
    <div className="border-interaction-hover text-text-default flex w-full gap-3.5 rounded-xl border p-4">
      {/* Hour */}
      <div className="border-border-primary custom-scrollbar flex h-38 flex-1 flex-col overflow-y-auto rounded-xl border p-2">
        {hours.map((hour) => {
          return (
            <button
              key={hour}
              type="button"
              className={`px-2 py-[7.5px] text-left ${selectedHour === hour ? 'outline-brand-primary rounded-xl outline' : 'outline-0'}`}
              onClick={() => setSelectedHour(hour)}
              aria-label={`${hour}시`}
            >
              {hour}:00
            </button>
          );
        })}
      </div>

      {/* Minute */}
      <div className="flex flex-col gap-2">
        {minutes.map((minute) => {
          return (
            <Button
              key={minute}
              variant={selectedMinute === minute ? 'primary-filled' : 'primary-outline'}
              onClick={() => setSelectedMinute(minute)}
              aria-label={`${minute}분`}
            >
              {minute}분
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarTime;
