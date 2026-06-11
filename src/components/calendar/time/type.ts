export interface CalendarTimeProps {
  selectedHour?: number;
  setSelectedHour: (hour: number) => void;
  selectedMinute?: number;
  setSelectedMinute: (minute: number) => void;
}