import Button from '@/components/button/Button';
import type { TimeState } from '@/types/time';
import { generateHoursByInterval, generateMinutesByInterval } from '@/utils/date';

const hours = generateHoursByInterval();
const minutes = generateMinutesByInterval(30);

interface CalendarTimeProps {
  selectedTime: TimeState;
  setSelectedTime: React.Dispatch<React.SetStateAction<TimeState>>;
}

const CalendarTime = ({ selectedTime, setSelectedTime }: CalendarTimeProps) => {
  const { hour: selectedHour, minute: selectedMinute } = selectedTime;

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
              onClick={() => setSelectedTime((prev) => ({ ...prev, hour }))}
              aria-label={`${hour}시`}
            >
              {hour}:00
            </button>
          );
        })}
      </div>

      {/* Minute */}
      <div className="flex flex-col justify-center gap-2">
        {minutes.map((minute) => {
          return (
            <Button
              type="button"
              key={minute}
              variant={selectedMinute === minute ? 'primary-filled' : 'primary-outline'}
              onClick={() => setSelectedTime((prev) => ({ ...prev, minute }))}
              aria-label={`${minute}분`}
              className="min-w-0"
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
