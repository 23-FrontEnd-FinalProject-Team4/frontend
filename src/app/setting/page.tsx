import AlertIcon from '@/assets/icons/alert.svg';
import SecessionIcon from '@/assets/icons/secession.svg';

import Button from '@/components/button/Button';
import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import Input from '@/components/input/Input';

export default function SettingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-[780px] flex-col gap-5">
        <main className="bg-background-primary flex max-h-[900px] w-full max-w-[780px] flex-col rounded-2xl p-8 md:p-18">
          <h1 className="text-medium font-semibold">계정 설정</h1>
          <div className="my-8 flex justify-center">
            <EditableProfileImage src="/images/default-profile.png" size="lg" />
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name">이름</label>
              <Input id="name" defaultValue="안해나" placeholder="이름을 입력해주세요." />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                defaultValue="codeit@codeit.com"
                placeholder="이메일을 입력해주세요."
                isDisabled
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password">비밀번호</label>
              <Input id="password" value="dddd" isDisabled rightButtonText="변경하기" />
            </div>
            <button type="button" className="text-status-danger mt-2 flex items-center gap-1">
              <SecessionIcon />
              <span>회원 탈퇴하기</span>
            </button>
          </form>
        </main>
        <div className="bg-brand-primary text-md mx-6 flex items-center justify-between rounded-xl px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <AlertIcon className="h-4 w-4 text-white" />
            <span>이름과 프로필 사진 변경</span>
          </div>
          <button className="bg-background-primary text-brand-primary rounded-lg px-4 py-2">
            변경사항 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
