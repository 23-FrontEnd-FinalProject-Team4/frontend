import { DateItemProps } from './type';

const DateItem = ({ date, isSelected, onClick }: DateItemProps) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const week = date.toLocaleDateString('ko-KR', { weekday: 'short' });

  return (
    <button
      type="button"
      onClick={() => onClick?.(date)}
      className={`border-border-primary flex w-full flex-col gap-0.5 rounded-lg border py-2 md:gap-1 md:rounded-2xl md:px-4 md:py-3 ${
        isSelected
          ? 'text-text-inverse border-0 bg-slate-800'
          : 'bg-background-primary hover:bg-background-secondary text-text-default'
      }`}
      aria-label={`${month}월 ${day}일`}
    >
      <span
        className={`text-center align-middle text-sm font-medium ${
          isSelected ? 'text-text-inverse' : 'text-text-default'
        }`}
      >
        {week}
      </span>
      <span
        className={`text-center align-middle text-xl font-semibold ${
          isSelected ? 'text-text-inverse' : 'text-text-primary'
        }`}
      >
        {day}
      </span>
    </button>
  );
};

export default DateItem;
