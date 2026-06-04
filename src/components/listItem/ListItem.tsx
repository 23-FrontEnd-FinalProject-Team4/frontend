'use client';

import { useState } from 'react';
import { ListItemProps } from './type';
import ListItemInfo from './ListItemInfo';
import ListItemDate from './ListItemDate';

const ListItem = ({
  task: { name, frequency, date, doneAt, commentCount = 0 },
  onEdit,
  onDelete,
  onToggle
}: ListItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isDone = Boolean(doneAt);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    <div className="text-text-default outline-border-primary flex flex-col gap-2.5 rounded-2xl px-3.5 py-3 outline">
      <ListItemInfo
        name={name}
        isDone={isDone}
        commentCount={commentCount}
        isDropdownOpen={isDropdownOpen}
        handleToggleDropdown={handleToggleDropdown}
        handleSelect={handleSelect}
        onToggle={onToggle}
      />
      <ListItemDate date={date} frequency={frequency} />
    </div>
  );
};

export default ListItem;
