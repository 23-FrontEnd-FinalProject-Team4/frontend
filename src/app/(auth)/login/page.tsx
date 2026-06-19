import Link from 'next/link';

import SocialAuthSection from '@/components/socialAuthSection/SocialAuthSection';

import LoginFormSection from './_components/LoginFormSection';

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

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

const getSafeRedirectPath = (redirectPath?: string) => {
  if (!redirectPath || !redirectPath.startsWith('/') || redirectPath.startsWith('//')) {
    return undefined;
  }

  return redirectPath;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { redirect } = await searchParams;
  const postLoginRedirectPath = getSafeRedirectPath(redirect);

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <section className="bg-background-primary w-full max-w-[550px] rounded-2xl p-8 md:p-18">
        <h1 className="mb-12 text-center text-xl font-semibold">로그인</h1>
        <LoginFormSection postLoginRedirectPath={postLoginRedirectPath} />
        <SignupPromptSection />
        <SocialAuthSection label="간편 로그인하기" />
      </section>
    </main>
  );
};

export default LoginPage;
