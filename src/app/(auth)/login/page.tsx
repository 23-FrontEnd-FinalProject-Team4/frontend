import KakaoIcon from '@/assets/images/kakaotalk.svg';

import LoginFormSection from './_components/LoginFormSection';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <main className="bg-background-primary flex h-[720px] w-[550px] flex-col rounded-2xl p-18">
        <h1 className="mb-12 text-center text-xl font-semibold">로그인</h1>

        <LoginFormSection />

        <div className="mb-4 flex items-center gap-8">
          <div className="bg-border-primary h-px flex-1" />
          <span className="text-text-default text-md font-light">OR</span>
          <div className="bg-border-primary h-px flex-1" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-md text-text-default">간편 로그인하기</span>
          <KakaoIcon />
        </div>
      </main>
    </div>
  );
}
