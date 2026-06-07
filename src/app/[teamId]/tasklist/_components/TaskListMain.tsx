'use client';

import { TaskList } from '@/apis/group/type';
import TaskListTitle from './TaskListTitle';
import { useState } from 'react';
import ListItem from '@/components/listItem/ListItem';
import Button from '@/components/button/Button';
import PlusIcon from '@/assets/icons/plus_white.svg?react';

const TaskListMain = ({ taskList }: { taskList: TaskList }) => {
  // TODO: 해당 위치에서 task들에 대한 CRUD 진행
  // 동시에 selectedDate 상태 제거 (URLSearchParams로 이동하여 관리하도록 변경)

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNextWeek = () => {
    setSelectedDate((prevDate) => new Date(prevDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => new Date(prevDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="relative flex flex-col gap-10 rounded-[20px] bg-white p-4 md:p-7.5 xl:p-10">
      <TaskListTitle
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
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
