'use client';

import { useRouter } from 'next/navigation';

import { overlay } from 'overlay-kit';
import { toast } from 'react-hot-toast';

import { TaskList } from '@/apis/group/type';
import { Task } from '@/apis/task/type';
import PlusIcon from '@/assets/icons/plus_white.svg?react';
import Button from '@/components/button/Button';
import ListItem from '@/components/listItem/ListItem';
import { useTaskDate } from '@/hooks/useTaskDate';
import { getErrorMessage } from '@/lib/error';
import { useToggleTask } from '@/queries/task/queries';
import { addDays } from '@/utils/date';

import InfoOverlay from './InfoOverlay';
import TaskListTitle from './TaskListTitle';
import AddTaskModal from './modals/AddTaskModal';
import DeleteTaskModal from './modals/DeleteTaskModal';
import EditTaskModal from './modals/EditTaskModal';

interface TaskListMainProps {
  taskList: TaskList;
  groupId: number;
}

const TaskListMain = ({ taskList, groupId }: TaskListMainProps) => {
  const { selectedDate, setDate } = useTaskDate();
  const router = useRouter();
  const { mutate: toggleTask } = useToggleTask({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, '할 일 상태를 변경하지 못했습니다.'));
    },
  });

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

  const handleAddModalOpen = () => {
    overlay.open(({ isOpen, close }) => (
      <AddTaskModal isOpen={isOpen} onClose={close} groupId={groupId} taskListId={taskList.id} />
    ));
  };

  const handleEditModalOpen = (task: Task) => {
    overlay.open(({ isOpen, close }) => (
      <EditTaskModal
        isOpen={isOpen}
        onClose={close}
        task={task}
        groupId={groupId}
        taskListId={taskList.id}
      />
    ));
  };

  const handleDeleteModalOpen = (task: Task) => {
    overlay.open(({ isOpen, close }) => (
      <DeleteTaskModal
        isOpen={isOpen}
        onClose={close}
        task={task}
        groupId={groupId}
        taskListId={taskList.id}
      />
    ));
  };

  const handleToggle = (task: Task) => {
    toggleTask({
      groupId,
      taskId: task.id,
      taskListId: taskList.id,
      done: !task.doneAt,
    });
  };

  return (
    <div className="relative flex flex-col gap-10 rounded-[20px] bg-white p-4 md:p-7.5 xl:p-10">
      <TaskListTitle
        onNextWeek={handleNextWeek}
        onPrevWeek={handlePrevWeek}
        onToday={handleToday}
        taskName={taskList?.name}
      />
      <div className="flex flex-col gap-3">
        {taskList?.tasks.map((task) => (
          <ListItem
            task={task}
            key={task.id}
            onClick={() => handleOpenOverlay(task)}
            onToggle={() => {
              handleToggle(task);
            }}
            onDelete={() => handleDeleteModalOpen(task)}
            onEdit={() => handleEditModalOpen(task)}
          />
        ))}
      </div>
      <div className="fixed right-5 bottom-5 xl:right-20 xl:bottom-20">
        <Button
          variant="icon-circle"
          icon={<PlusIcon className="size-6" />}
          onClick={handleAddModalOpen}
        />
      </div>
    </div>
  );
};

export default TaskListMain;
