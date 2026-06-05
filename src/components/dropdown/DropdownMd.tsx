import { useEffect, useRef, useState } from 'react';

import DownArrowIcon from '@/assets/icons/down_arrow.svg?react';

import Dropdown from './Dropdown';
import type { DropdownMdProps } from './type';

export default function DropdownMd({
  children,
  size = 'md',
  isMenuOpen = false,
  options,
  onSelect,
}: DropdownMdProps) {
  const [isOpen, setIsOpen] = useState(isMenuOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sizeStyle = {
    md: {
      button: 'h-11 min-w-[120px] px-3.5 text-md',
      menu: 'min-w-[120px] text-md',
      icon: 'size-5',
    },

    sm: {
      button: 'h-10 min-w-[94px] px-3 text-xs',
      menu: 'min-w-[94px] text-xs',
      icon: 'size-5',
    },
  };
  const current = sizeStyle[size];

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`border-border-primary bg-background-primary text-text-default inline-flex items-center justify-between rounded-xl border ${current.button} `}
      >
        {children}
        <DownArrowIcon className={current.icon} />
      </button>
      {isOpen && (
        <Dropdown
          options={options.map((option) => ({ label: option, value: option }))}
          size={size}
          onSelect={onSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
