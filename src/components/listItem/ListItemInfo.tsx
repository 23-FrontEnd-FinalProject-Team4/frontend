'use client';

import { useRef, useState } from 'react';

import CommentIcon from '@/assets/icons/comment.svg?react';
import KebabIcon from '@/assets/icons/kebab.svg?react';
import { OPTIONS } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import Dropdown from '../dropdown/Dropdown';
import TaskCheckbox from '../taskCheckbox/TaskCheckbox';
import { ListItemInfoProps } from './type';

const ListItemInfo = ({
  name,
  isDone,
  commentCount,
  onToggle,
  onEdit,
  onDelete,
}: ListItemInfoProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleSelect = (value: string) => {
    if (value === 'EDIT') {
      onEdit();
    }
    if (value === 'DELETE') {
      onDelete();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex gap-3.5" onClick={(e) => e.stopPropagation()}>
        <TaskCheckbox task={name} checked={isDone} size="lg" onChange={onToggle} />
        {commentCount > 0 && (
          <div className="flex items-center gap-1">
            <CommentIcon width={16} height={16} />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
      <button
        onClick={handleToggleDropdown}
        type="button"
        aria-label="할 일 메뉴 열기"
        aria-expanded={isDropdownOpen}
        className="text-icon-primary hover:bg-background-secondary hover:text-brand-primary focus-visible:ring-brand-primary flex size-7 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-95"
      >
        <KebabIcon width={16} height={16} />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-25" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
          <Dropdown options={OPTIONS} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default ListItemInfo;
