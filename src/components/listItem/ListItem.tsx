import ListItemDate from './ListItemDate';
import ListItemInfo from './ListItemInfo';
import { ListItemProps } from './type';

const ListItem = ({ task, onEdit, onDelete, onToggle, onClick }: ListItemProps) => {
  const { name, frequency, startDate, doneAt, commentCount } = task;
  const isDone = Boolean(doneAt);

  return (
    <div
      className={`text-text-default outline-border-primary flex cursor-pointer flex-col gap-2.5 rounded-2xl px-3.5 py-3 outline ${isDone ? 'bg-background-secondary' : 'bg-background-primary'}`}
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
      <ListItemDate date={startDate} frequency={frequency} />
    </div>
  );
};

export default ListItem;
