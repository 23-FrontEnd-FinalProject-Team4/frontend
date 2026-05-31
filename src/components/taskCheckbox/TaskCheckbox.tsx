import CheckboxEmptyIcon from '@/assets/icons/checkbox_empty.svg?react';
import CheckboxFilledIcon from '@/assets/icons/checkbox_fill.svg?react';

import type { TaskCheckboxProps } from './type';

const wrapperSizeStyle = {
  sm: 'gap-2',
  lg: 'gap-2.5',
} as const;

const taskSizeStyle = {
  sm: 'text-md',
  lg: 'text-lg',
} as const;

const iconSize = {
  sm: 16,
  lg: 18,
} as const;

export default function TaskCheckbox({
  task,
  size = 'sm',
  checked = false,
  disabled = false,
  onChange,
}: TaskCheckboxProps) {
  const isCompleted = checked && size === 'lg';

  const wrapperClassName = disabled
    ? `inline-flex cursor-not-allowed items-center ${wrapperSizeStyle[size]}`
    : `inline-flex cursor-pointer items-center ${wrapperSizeStyle[size]}`;

  const taskClassName = disabled
    ? 'text-text-disabled'
    : checked
      ? isCompleted
        ? 'text-text-disabled line-through'
        : 'text-text-disabled'
      : 'text-text-primary';

  return (
    <label className={wrapperClassName}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />

      {checked ? (
        <CheckboxFilledIcon width={iconSize[size]} height={iconSize[size]} />
      ) : (
        <CheckboxEmptyIcon width={iconSize[size]} height={iconSize[size]} />
      )}

      <span className={`${taskClassName} ${taskSizeStyle[size]}`}>{task}</span>
    </label>
  );
}
