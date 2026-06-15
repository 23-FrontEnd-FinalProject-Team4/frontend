import SettingIcon from '@/assets/icons/setting.svg?react';

interface TaskListHeaderProps {
  name: string;
}

const TaskListHeader = ({ name }: TaskListHeaderProps) => {
  return (
    <div className="text-text-primary xl:outline-border-primary flex items-center gap-2 rounded-xl bg-transparent text-center text-2xl font-bold xl:w-full xl:justify-between xl:bg-white xl:px-6 xl:py-4.5 xl:outline">
      {name}
      {/* TODO: API 연결 시 기능 추가 */}
      <button type="button" aria-label="설정">
        <SettingIcon className="size-6" />
      </button>
    </div>
  );
};

export default TaskListHeader;
