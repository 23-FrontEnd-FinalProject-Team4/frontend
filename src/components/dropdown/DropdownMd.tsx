import { useState } from 'react';

import DownArrowIcon from '@/assets/icons/down_arrow.svg?react';

import type { DropdownMdProps } from './type';

export default function DropdownMd({
  children,
  size = 'md',
  menuOpen = false,
  options,
}: DropdownMdProps) {
  const [isOpen, setIsOpen] = useState(menuOpen);
  const sizeStyle = {
    md: {
      button: 'h-11 min-w-[120px] px-3.5 text-md',
      menu: 'max-w-[120px] text-md',
      icon: 'size-5',
    },

    sm: {
      button: 'h-10 min-w-[94px] px-3 text-xs',
      menu: 'max-w-[94px] text-xs',
      icon: 'size-5',
    },
  };
  const current = sizeStyle[size];

  return (
    <div>
      <button
        onClick={() => {
          if (menuOpen === undefined) {
            setIsOpen(!isOpen);
          }
        }}
        className={`border-border-primary bg-background-primary text-text-default flex items-center justify-between rounded-xl border ${current.button} `}
      >
        {children}
        <DownArrowIcon className={current.icon} />
      </button>
      {isOpen && (
        <div
          className={`border-border-primary bg-background-primary mt-1 flex flex-col rounded-xl border ${current.menu} `}
        >
          {options.map((option) => (
            <button key={option} className="hover:bg-background-secondary px-3 py-3 text-left">
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
