'use client';

import { useRef, useState } from 'react';

import { overlay } from 'overlay-kit';

import SettingIcon from '@/assets/icons/setting.svg?react';
import Dropdown from '@/components/dropdown/Dropdown';
import { OPTIONS } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import DeleteTaskListModal from './modals/DeleteTaskListModal';
import EditTaskListModal from './modals/EditTaskListModal';

interface TaskListHeaderProps {
  name: string;
  groupId: number;
  taskListId: number;
}

const TaskListHeader = ({ name, groupId, taskListId }: TaskListHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleMenuSelect = (value: string) => {
    setIsOpen(false);

    if (value === 'EDIT') {
      overlay.open(({ isOpen, close }) => (
        <EditTaskListModal
          isOpen={isOpen}
          onClose={close}
          groupId={groupId}
          taskListId={taskListId}
          title={name}
        />
      ));
    } else {
      overlay.open(({ isOpen, close }) => (
        <DeleteTaskListModal
          isOpen={isOpen}
          onClose={close}
          groupId={groupId}
          taskListId={taskListId}
          taskListName={name}
        />
      ));
    }
  };

  return (
    <div className="text-text-primary xl:outline-border-primary flex items-center gap-2 rounded-xl bg-transparent text-center text-2xl font-bold xl:w-full xl:justify-between xl:bg-white xl:px-6 xl:py-4.5 xl:outline">
      {name}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          aria-label="설정"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SettingIcon className="size-6" />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 z-20 mt-1 [&>div]:top-0 [&>div]:right-0 [&>div]:left-auto">
            <Dropdown
              options={OPTIONS}
              onSelect={handleMenuSelect}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListHeader;
