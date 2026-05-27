import ProfileIcon from '@/assets/icons/profile.svg';

export default function LoggedOutFooter() {
  return (
    <div className="flex flex-row justify-between border-t border-[#E2E8F0] pt-6">
      <div className="flex flex-row items-center gap-3">
        <ProfileIcon alt="프로필 이미지" className="h-10 w-10" />
        로그인
      </div>
    </div>
  );
}
