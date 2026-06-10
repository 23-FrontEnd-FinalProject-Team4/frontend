'use client';

import { TaskList } from '@/apis/group/type';
import PlusIcon from '@/assets/icons/plus_white.svg?react';
import { addDays } from '@/utils/date';
import { overlay } from 'overlay-kit';

import Button from '@/components/button/Button';
import ListItem from '@/components/listItem/ListItem';

import { useTaskDate } from '@/hooks/useTaskDate';

import InfoOverlay from './InfoOverlay';
import TaskListTitle from './TaskListTitle';

interface TaskListMainProps {
  taskList: TaskList;
}

const TaskListMain = ({ taskList }: TaskListMainProps) => {
  // TODO: 해당 위치에서 task들에 대한 CRUD 진행
  const { selectedDate, setDate } = useTaskDate();

  const handleNextWeek = () => {
    setDate(addDays(selectedDate, 7));
  };

  const handlePrevWeek = () => {
    setDate(addDays(selectedDate, -7));
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const handleOpenOverlay = (task: TaskList['tasks'][0]) => {
    overlay.open(({ isOpen, close }) => (
      <InfoOverlay task={task} isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <div className="relative flex flex-col gap-10 rounded-[20px] bg-white p-4 md:p-7.5 xl:p-10">
      <TaskListTitle
        onNextWeek={handleNextWeek}
        onPrevWeek={handlePrevWeek}
        onToday={handleToday}
        taskName={taskList.name}
      />
      <div className="flex flex-col gap-3">
        {taskList.tasks.map((task) => (
          <ListItem
            task={task}
            key={task.id}
            onClick={() => handleOpenOverlay(task)}
            // TODO: API 연결 시 함수 연결
            onToggle={() => {}}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        ))}
      </div>
      <div className="fixed right-5 bottom-5 xl:right-20 xl:bottom-20">
        <Button variant="icon-circle" icon={<PlusIcon className="size-6" />} />
      </div>
    </div>
  );
};

export default TaskListMain;
