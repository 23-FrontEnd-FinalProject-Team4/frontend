import ProfileIcon from '@/assets/icons/profile.svg';
import SettingsIcon from '@/assets/icons/setting.svg';

export default function LoggedInFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-between border-t border-[#E2E8F0] pt-6"
    >
      <div className="flex flex-row items-center gap-3">
        {/* 사용자 프로필 출력 */}
        <ProfileIcon className="h-10 w-10" />
        {!collapsed && <span>안해나</span>}
      </div>
      {!collapsed && <SettingsIcon className="h-6 w-6" />}
    </button>
  );
}
