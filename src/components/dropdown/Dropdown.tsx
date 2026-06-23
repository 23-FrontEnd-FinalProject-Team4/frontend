import { useEffect } from 'react';

import { cn } from '@/utils/cn';

import type { DropdownProps } from './type';

const DROPDOWN_SIZE_STYLES = {
  md: 'min-w-[120px] text-md',
  sm: 'min-w-[94px] text-xs',
};

const Dropdown = ({ options, size = 'md', className, onSelect, onClose }: DropdownProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="menu"
      className={cn(
        'border-border-primary bg-background-primary absolute top-full left-0 z-10 mt-1 rounded-xl border',
        DROPDOWN_SIZE_STYLES[size],
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
};

export default Dropdown;
