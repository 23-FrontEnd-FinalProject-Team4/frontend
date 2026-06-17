'use client';

import { Task } from '@/apis/task/type';
import ListItem from '@/components/listItem/ListItem';

const MyHistoryClient = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          onToggle={() => {}}
          onDelete={() => {}}
          onEdit={() => {}}
        />
      ))}
    </>
  );
};

export default MyHistoryClient;
