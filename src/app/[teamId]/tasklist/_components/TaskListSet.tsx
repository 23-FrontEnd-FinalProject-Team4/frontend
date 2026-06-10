'use client';

import { TaskList } from '@/apis/group/type';
import KebabIcon from '@/assets/icons/kebab.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';

import BadgeDone from '@/components/badgeDone/BadgeDone';
import Button from '@/components/button/Button';
import DropdownMd from '@/components/dropdown/DropdownMd';

import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface TaskListSetProps {
  taskLists: TaskList[];
  selectedId: number | null;
}

const TaskListSet = ({ taskLists, selectedId: propSelectedId }: TaskListSetProps) => {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const selectedId = Number(searchParams.get('taskListId')) || propSelectedId;
  const selectedTaskList = taskLists.find((taskList) => taskList.id === selectedId);

  const options = taskLists.map((taskList) => taskList.name);

  const handleSelect = (name: string) => {
    const taskList = taskLists.find((taskList) => taskList.name === name);

    if (taskList) {
      setSearchParams({ taskListId: [taskList.id.toString()] });
    }
  };

  return (
    <>
      {/* mobile, tablet */}
      <div className="flex flex-col gap-2 xl:hidden">
        <div className="text-text-default text-xs font-semibold md:text-lg">할 일</div>
        <div className="flex w-full items-center justify-between">
          {selectedTaskList && (
            <DropdownMd options={options} onSelect={handleSelect}>
              {selectedTaskList.name}
            </DropdownMd>
          )}
          <Button variant="secondary-whiteFilled" icon={<PlusIcon width={16} height={16} />}>
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
                className={`border-border-primary flex h-[54px] w-[270px] cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-2 text-lg font-semibold ${isSelected ? 'border-brand-primary' : 'text-text-default'}`}
                role="button"
                aria-label={taskList.name}
                onClick={() => {
                  handleSelect(taskList.name);
                }}
              >
                {taskList.name}
                <div className="flex items-center justify-center">
                  <BadgeDone
                    className="border-0 shadow-none"
                    total={taskList.tasks.length}
                    current={taskList.tasks.filter((task) => task.doneAt).length}
                    status="progress"
                  />
                  <button type="button" aria-label="할 일 목록 설정 열기">
                    <KebabIcon width={24} height={24} viewBox="0 0 16 16" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          variant="secondary-whiteFilled"
          className="w-fit self-center"
          icon={<PlusIcon width={16} height={16} />}
        >
          할 일 목록 추가
        </Button>
      </div>
    </>
  );
};

export default TaskListSet;
