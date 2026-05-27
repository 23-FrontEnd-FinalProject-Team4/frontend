import type { ProgressBarProps, ProgressBarSize } from './type';

const PROGRESS_BAR_SIZE_CLASS: Record<ProgressBarSize, string> = {
  sm: 'h-4',
  md: 'h-5',
  lg: 'h-[27px]',
};

const cn = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(' ');

const getProgressValues = ({
  value,
  max,
  completed,
  total,
}: Pick<ProgressBarProps, 'value' | 'max' | 'completed' | 'total'>) => ({
  currentValue: completed ?? value ?? 0,
  maxValue: total ?? max ?? 100,
});

const getBoundedValue = (value: number, max: number) => {
  if (max <= 0) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
};

const getProgressPercent = (value: number, max: number) => {
  if (max <= 0) {
    return 0;
  }

  return (getBoundedValue(value, max) / max) * 100;
};

const ProgressBar = ({
  value,
  max,
  completed,
  total,
  size = 'lg',
  showTrackPattern = true,
  className,
  barClassName,
  label,
}: ProgressBarProps) => {
  const { currentValue, maxValue } = getProgressValues({ value, max, completed, total });
  const boundedValue = getBoundedValue(currentValue, maxValue);
  const progressPercent = getProgressPercent(currentValue, maxValue);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={boundedValue}
      className={cn(
        'relative w-full overflow-hidden rounded-full bg-slate-100',
        PROGRESS_BAR_SIZE_CLASS[size],
        showTrackPattern &&
          'bg-[repeating-linear-gradient(135deg,#f8fafc_0,#f8fafc_28px,#eef3f9_28px,#eef3f9_56px)]',
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-y-0 left-0 rounded-full bg-[#5087f7] transition-[width] duration-300 ease-out',
          barClassName,
        )}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
