import { ListItemProps } from './type';
import ListItemInfo from './ListItemInfo';
import ListItemDate from './ListItemDate';

const ListItem = ({
  task: { name, frequency, date, doneAt, commentCount = 0 },
  onEdit,
  onDelete,
  onToggle
}: ListItemProps) => {
  const isDone = Boolean(doneAt);
  return (
    <div className="text-text-default outline-border-primary flex flex-col gap-2.5 rounded-2xl px-3.5 py-3 outline">
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
