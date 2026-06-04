import { Task } from '@/apis/task/type';

export interface ListItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (checked: boolean) => void;
}

export interface ListItemInfoProps {
  name: Task['name'];
  isDone: boolean;
  commentCount: Task['commentCount'];
  onToggle: (checked: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ListItemDateProps {
  date: Task['date']
  frequency: Task['frequency']
}
