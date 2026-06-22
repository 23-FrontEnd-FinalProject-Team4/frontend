import { cn } from '@/utils/cn';

import { DropdownProps } from './type';

export default function Dropdown({
  options,
  size = 'md',
  className,
  onSelect,
  onClose,
}: DropdownProps) {
  const sizeStyle = {
    md: {
      menu: 'min-w-[120px] text-md',
    },

    sm: {
      menu: 'min-w-[94px] text-xs',
    },
  };
  const current = sizeStyle[size];

  return (
    <div
      role="menu"
      className={cn(
        'border-border-primary bg-background-primary absolute top-full left-0 z-10 mt-1 rounded-xl border',
        current.menu,
        className,
      )}
    >
      {options.map((option) => (
        <button
          type="button"
          role="menuitem"
          key={option.value}
          className="hover:bg-background-secondary w-full px-3 py-3 text-left"
          onClick={() => {
            onSelect?.(option.value);
            onClose?.();
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
