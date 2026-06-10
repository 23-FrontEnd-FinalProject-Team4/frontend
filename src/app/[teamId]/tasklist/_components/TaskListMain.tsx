'use client';

import { TaskList } from '@/apis/group/type';
import TaskListTitle from './TaskListTitle';
import ListItem from '@/components/listItem/ListItem';
import Button from '@/components/button/Button';
import PlusIcon from '@/assets/icons/plus_white.svg?react';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { addDays, formatISODate } from '@/utils/date';

interface TaskListMainProps {
  taskList: TaskList;
}

const TaskListMain = ({ taskList }: TaskListMainProps) => {
  // TODO: 해당 위치에서 task들에 대한 CRUD 진행
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const handleNextWeek = () => {
    setSearchParams({ date: [addDays(date, 7)] });
  };

  const handlePrevWeek = () => {
    setSearchParams({ date: [addDays(date, -7)] });
  };

  const handleToday = () => {
    setSearchParams({ date: [formatISODate(new Date())] });
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
