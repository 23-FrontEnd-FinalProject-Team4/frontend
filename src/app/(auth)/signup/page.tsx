import KakaoIcon from '@/assets/images/kakaotalk.svg';

import SignupFormSection from './_components/SignupFormSection';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="bg-background-primary flex max-h-[780px] w-full max-w-[550px] flex-col rounded-2xl p-8 md:p-18">
        <h1 className="mb-10 text-center text-xl font-semibold">회원가입</h1>

        <SignupFormSection />

        <div className="mt-6 mb-4 flex items-center gap-8">
          <div className="bg-border-primary h-px flex-1" />
          <span className="text-text-default text-md font-light">OR</span>
          <div className="bg-border-primary h-px flex-1" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-md text-text-default">간편 회원가입하기</span>
          <KakaoIcon />
        </div>
      </main>
    </div>
  );
}
