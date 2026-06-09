import Link from 'next/link';

import LoginFormSection from './_components/LoginFormSection';
import SocialLoginSection from './_components/SocialLoginSection';

const SignupPromptSection = () => {
  return (
    <div className="text-md m-7 flex justify-center gap-2">
      <span>아직 계정이 없으신가요?</span>
      <Link href="/signup" className="text-brand-primary !underline">
        가입하기
      </Link>
    </div>
  );
};

const LoginPage = () => {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <section className="bg-background-primary w-full max-w-[550px] rounded-2xl p-8 md:p-18">
        <h1 className="mb-12 text-center text-xl font-semibold">로그인</h1>
        <LoginFormSection />
        <SignupPromptSection />
        <SocialLoginSection />
      </section>
    </main>
  );
};

export default LoginPage;
