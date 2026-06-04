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
  isDropdownOpen: boolean;
  handleToggleDropdown: () => void;
  handleSelect: (value: string) => void;
  onToggle: (checked: boolean) => void;
}

export interface ListItemDateProps {
  date: Task['date']
  frequency: Task['frequency']
}

export const FREQUENCY_TEXT = {
  ONCE: '일회성',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매달 반복',
} as const;

export const OPTIONS = [
  { value: 'EDIT', label: '수정' },
  { value: 'DELETE', label: '삭제' },
];
