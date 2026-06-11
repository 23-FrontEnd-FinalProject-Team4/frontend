import SecessionIcon from '@/assets/icons/secession.svg';

import PasswordChangeForm from './_components/PasswordChangeForm';
import ProfileUpdateForm from './_components/ProfileUpdateForm';
import SettingSaveBar from './_components/SettingSaveBar';

const SettingPage = () => {
  return (
    <main className="grid min-h-screen place-items-center gap-5 p-4">
      <section className="bg-background-primary w-full max-w-[780px] rounded-2xl p-8 md:p-18">
        <h1 className="text-medium font-semibold">계정 설정</h1>
        <ProfileUpdateForm />
        <PasswordChangeForm />

        <button type="button" className="text-status-danger mt-8 flex items-center gap-1">
          <SecessionIcon aria-hidden />
          <span>회원 탈퇴하기</span>
        </button>
      </section>
      <div className="w-full max-w-[780px]">
        <SettingSaveBar
          description="이름과 프로필 사진 변경"
          formId="settings-profile-form"
          buttonText="프로필 저장하기"
        />
      </div>
    </main>
  );
};

export default SettingPage;
