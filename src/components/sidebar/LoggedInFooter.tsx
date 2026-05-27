import ProfileIcon from '@/assets/icons/profile.svg';
import SettingsIcon from '@/assets/icons/setting.svg';

export default function LoggedInFooter() {
  return (
    <div className="flex flex-row justify-between border-t border-[#E2E8F0] pt-6">
      <div className="flex flex-row items-center gap-3">
        {/* 사용자 프로필 출력 */}
        <ProfileIcon alt="프로필 이미지" className="h-10 w-10" />
        안해나
      </div>

      {/* 계정 설정 모달 출력 */}
      <button>
        <SettingsIcon alt="설정 아이콘" className="h-6 w-6" />
      </button>
    </div>
  );
}
