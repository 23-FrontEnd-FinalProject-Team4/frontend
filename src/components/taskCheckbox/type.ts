export type TaskCheckboxSize = 'sm' | 'lg';

export interface TaskCheckboxProps {
  task: string;
  size?: TaskCheckboxSize;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}
