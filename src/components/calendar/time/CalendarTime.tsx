import Button from '@/components/button/Button';
import type { TimeState } from '@/types/time';
import { cn } from '@/utils/cn';
import { generateHoursByInterval, generateMinutesByInterval } from '@/utils/date';

const hours = generateHoursByInterval();
const minutes = generateMinutesByInterval(30);

interface CalendarTimeProps {
  selectedTime: TimeState;
  setSelectedTime: (time: TimeState) => void;
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
              onClick={() => setSelectedTime({ ...selectedTime, hour })}
              aria-label={`${hour}시`}
            >
              {hour}:{String(selectedMinute).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Minute */}
      <div className="flex flex-col gap-2">
        {minutes.map((minute) => {
          const isSelected = selectedMinute === minute;

          return (
            <Button
              type="button"
              key={minute}
              variant="primary-outline"
              className={cn(
                'min-w-0 transition-colors',
                isSelected &&
                  'bg-brand-primary text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed',
              )}
              onClick={() => setSelectedTime({ ...selectedTime, minute })}
              aria-label={`${minute}분`}
              aria-pressed={isSelected}
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
