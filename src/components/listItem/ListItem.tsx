import { cn } from '@/utils/cn';

import ListItemDate from './ListItemDate';
import ListItemInfo from './ListItemInfo';
import { ListItemProps } from './type';

const ListItem = ({ task, onEdit, onDelete, onToggle, onClick }: ListItemProps) => {
  const { name, frequency, date, doneAt, commentCount } = task;
  const isDone = Boolean(doneAt);

  return (
    <div
      className={cn(
        'text-text-default outline-border-primary flex cursor-pointer flex-col gap-2.5 rounded-2xl px-3.5 py-3 outline transition-all duration-200',
        'hover:outline-brand-primary/40 hover:-translate-y-0.5 hover:shadow-md',
        isDone
          ? 'bg-background-secondary hover:bg-background-secondary/80'
          : 'bg-background-primary hover:bg-background-secondary/50',
      )}
      onClick={onClick}
    >
      <ListItemInfo
        name={name}
        isDone={isDone}
        commentCount={commentCount}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <ListItemDate date={date} frequency={frequency} />
    </div>
  );
};

export default ListItem;
