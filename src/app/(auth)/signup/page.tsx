import SocialAuthSection from '@/components/socialAuthSection/SocialAuthSection';

import SignupFormSection from './_components/SignupFormSection';

const SignupPage = () => {
  return (
    <main className="bg-background-secondary grid min-h-screen place-items-center p-4">
      <section className="bg-background-primary w-full max-w-[550px] rounded-2xl p-8 md:p-18">
        <h1 className="mb-10 text-center text-xl font-semibold">회원가입</h1>
        <SignupFormSection />
        <SocialAuthSection label="간편 회원가입하기" />
      </section>
    </main>
  );
};

export default SignupPage;
