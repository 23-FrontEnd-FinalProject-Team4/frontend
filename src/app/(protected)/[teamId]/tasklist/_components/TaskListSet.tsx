'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { overlay } from 'overlay-kit';

import { TaskList } from '@/apis/group/type';
import KebabIcon from '@/assets/icons/kebab.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';
import BadgeDone from '@/components/badgeDone/BadgeDone';
import { BadgeStatus } from '@/components/badgeDone/type';
import Button from '@/components/button/Button';
import Dropdown from '@/components/dropdown/Dropdown';
import DropdownMd from '@/components/dropdown/DropdownMd';
import { OPTIONS } from '@/constants/listItem';
import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import AddTaskListModal from './modals/AddTaskListModal';
import DeleteTaskListModal from './modals/DeleteTaskListModal';
import EditTaskListModal from './modals/EditTaskListModal';

interface TaskListSetProps {
  taskLists: TaskList[];
  selectedTaskListId: number;
  groupId: number;
}

const TaskListSet = ({ taskLists, selectedTaskListId, groupId }: TaskListSetProps) => {
  const { setSearchParams } = useCustomSearchParams();
  const [dropdownOpenedId, setDropdownOpenedId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => {
    setDropdownOpenedId(null);
  });

  const selectedTaskList = taskLists.find((taskList) => taskList.id === selectedTaskListId);

  const options = taskLists.map((taskList) => taskList.name);

  const handleSelectTaskList = (name: string) => {
    const taskList = taskLists.find((taskList) => taskList.name === name);

    if (taskList) {
      setSearchParams({ taskListId: [taskList.id.toString()] });
    }
  };

  const handleToggleDropdown = (e: React.MouseEvent<HTMLButtonElement>, taskListId: number) => {
    e.stopPropagation();
    setDropdownOpenedId((prev) => (prev === taskListId ? null : taskListId));
  };

  const handleMenuItemSelect = (value: string) => {
    const dropdownSelectedTaskList = taskLists.find((taskList) => taskList.id === dropdownOpenedId);

    if (!dropdownSelectedTaskList) return;

    setDropdownOpenedId(null);

    if (value === 'EDIT') {
      overlay.open(({ isOpen, close }) => (
        <EditTaskListModal
          isOpen={isOpen}
          onClose={close}
          groupId={groupId}
          taskListId={dropdownSelectedTaskList.id}
          title={dropdownSelectedTaskList.name}
        />
      ));
    } else if (value === 'DELETE') {
      overlay.open(({ isOpen, close }) => (
        <DeleteTaskListModal
          isOpen={isOpen}
          onClose={() => handleDeleteSuccess(close, dropdownSelectedTaskList.id)}
          groupId={groupId}
          taskListId={dropdownSelectedTaskList.id}
          taskListName={dropdownSelectedTaskList.name}
        />
      ));
    }
  };

  const handleAddModalOpen = () => {
    overlay.open(({ isOpen, close }) => (
      <AddTaskListModal isOpen={isOpen} onClose={close} groupId={groupId} />
    ));
  };

  const router = useRouter();
  const handleDeleteSuccess = (close: () => void, deletedId: number) => {
    if (selectedTaskListId && selectedTaskListId === deletedId) {
      const remainingLists = taskLists.filter((list) => list.id !== deletedId);
      const params = new URLSearchParams(window.location.search);

      if (remainingLists.length > 0) {
        params.set('taskListId', remainingLists[0].id.toString());
      } else {
        params.delete('taskListId');
      }

      router.push(`?${params.toString()}`);
    }
    close();
  };

  const getTaskListBadgeStatus = (taskList: TaskList): BadgeStatus => {
    const doneTasks = taskList.tasks.filter((task) => task.doneAt).length;
    if (taskList.tasks.length === 0 || doneTasks === 0) return 'none';
    if (doneTasks === taskList.tasks.length) return 'done';
    return 'progress';
  };

  return (
    <>
      {/* mobile, tablet */}
      <div className="flex flex-col gap-2 xl:hidden">
        <div className="text-text-default text-xs font-semibold md:text-lg">할 일</div>
        <div className="flex w-full items-center justify-between">
          {selectedTaskList && (
            <DropdownMd options={options} onSelect={handleSelectTaskList}>
              {selectedTaskList.name}
            </DropdownMd>
          )}
          <Button
            variant="secondary-whiteFilled"
            icon={<PlusIcon width={16} height={16} />}
            onClick={handleAddModalOpen}
          >
            할 일 추가
          </Button>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden flex-col gap-8 xl:flex">
        <div className="text-xl font-bold">할 일 목록</div>
        <div className="flex flex-col items-center gap-1">
          {taskLists.map((taskList) => {
            const isSelected = taskList.id === selectedTaskList?.id;
            return (
              <div
                key={taskList.id}
                className={`border-border-primary relative flex h-[54px] w-[270px] cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-2 text-lg font-semibold ${isSelected ? 'border-brand-primary' : 'text-text-default'}`}
                role="button"
                aria-label={taskList.name}
                onClick={() => {
                  handleSelectTaskList(taskList.name);
                }}
              >
                {taskList.name}
                <div className="flex items-center justify-center">
                  <BadgeDone
                    className="min-w-10 overflow-visible border-0 bg-transparent p-0 shadow-none [&_svg]:size-4.5 [&_svg]:overflow-visible"
                    total={taskList.tasks.length}
                    current={taskList.tasks.filter((task) => task.doneAt).length}
                    status={getTaskListBadgeStatus(taskList)}
                  />
                  <button
                    type="button"
                    aria-label="할 일 목록 설정 열기"
                    onClick={(e) => handleToggleDropdown(e, taskList.id)}
                    aria-expanded={dropdownOpenedId === taskList.id}
                  >
                    <KebabIcon width={24} height={24} viewBox="0 0 16 16" />
                  </button>
                  {dropdownOpenedId === taskList.id && (
                    <div
                      className="absolute right-25"
                      ref={dropdownRef}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown options={OPTIONS} onSelect={handleMenuItemSelect} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          variant="secondary-whiteFilled"
          className="w-fit self-center"
          icon={<PlusIcon width={16} height={16} />}
          onClick={handleAddModalOpen}
        >
          할 일 목록 추가
        </Button>
      </div>
    </>
  );
};

export default TaskListSet;
