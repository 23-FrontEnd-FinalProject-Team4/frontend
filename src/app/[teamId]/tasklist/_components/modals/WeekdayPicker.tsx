interface WeekdayPickerProps {
  selectedDays: number[];
  onChange: (day: number[]) => void;
}

const WEEKDAYS_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

const WeekdayPicker = ({ selectedDays, onChange }: WeekdayPickerProps) => {
  const handleToggle = (day: number) => {
    onChange(
      selectedDays.includes(day) ? selectedDays.filter((d) => d !== day) : [...selectedDays, day],
    );
  };

  return (
    <div className="flex w-full justify-between">
      {WEEKDAYS_LABELS.map((weekday_label, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => handleToggle(idx)}
          aria-label={`${weekday_label}요일`}
          className={`rounded-xl p-4 text-sm font-medium ${selectedDays.includes(idx) ? 'bg-brand-primary text-white' : 'text-text-default outline-border-primary bg-white outline'}`}
        >
          {weekday_label}
        </button>
      ))}
    </div>
  );
};

export default WeekdayPicker;
