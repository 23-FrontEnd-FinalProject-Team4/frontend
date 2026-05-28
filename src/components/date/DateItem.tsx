interface DateProps {
  date: Date;
  isSelected: boolean;
  onClick?: (date: Date) => void;
}

export const DateItem = ({ date, isSelected, onClick }: DateProps) => {
  const day = date.getDate();
  const week = date.toLocaleDateString('ko-KR', { weekday: 'short' });

  return (
    <button
      type="button"
      onClick={() => onClick?.(date)}
      className={`border-border-primary flex w-full flex-col gap-0.5 rounded-lg border py-2 md:gap-1 md:rounded-2xl md:px-4 md:py-3 ${
        isSelected
          ? 'border-point-primary text-text-inverse border-0 bg-slate-800'
          : 'bg-background-primary hover:bg-background-secondary text-text-default'
      }`}
      name={week}
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
