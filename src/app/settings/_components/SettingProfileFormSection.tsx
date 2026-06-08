import SecessionIcon from '@/assets/icons/secession.svg';

import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import Input from '@/components/input/Input';

const SettingProfileFormSection = () => {
  return (
    <main className="bg-background-primary flex max-h-[800px] w-full max-w-[780px] flex-col rounded-2xl p-8 md:p-18">
      <h1 className="text-medium font-semibold">계정 설정</h1>
      <div className="my-8 flex justify-center">
        <EditableProfileImage src="/images/default-profile.png" size="lg" />
      </div>
      <form className="flex flex-col gap-4 pb-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="settings-name">이름</label>
          <Input id="settings-name" defaultValue="안해나" placeholder="이름을 입력해주세요." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="settings-email">이메일</label>
          <Input
            id="settings-email"
            defaultValue="codeit@codeit.com"
            placeholder="이메일을 입력해주세요."
            isDisabled
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="settings-password">비밀번호</label>
          <Input id="settings-password" value="dddd" isDisabled rightButtonText="변경하기" />
        </div>
        <button type="button" className="text-status-danger mt-2 flex items-center gap-1">
          <SecessionIcon />
          <span>회원 탈퇴하기</span>
        </button>
      </form>
    </main>
  );
};

export default SettingProfileFormSection;
