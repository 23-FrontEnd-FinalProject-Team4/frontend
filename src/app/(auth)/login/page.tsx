import Link from 'next/link';

import AlertIcon from '@/assets/icons/alert.svg?react';
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
  if (!redirectPath || !redirectPath.startsWith('/')) {
    return undefined;
  }

  try {
    const decodedPath = decodeURIComponent(redirectPath);
    const baseUrl = new URL('http://localhost');
    const redirectUrl = new URL(decodedPath, baseUrl);

    if (redirectUrl.origin !== baseUrl.origin || decodedPath.includes('\\')) {
      return undefined;
    }

    return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
  } catch {
    return undefined;
  }
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { redirect } = await searchParams;
  const postLoginRedirectPath = getSafeRedirectPath(redirect);
  const isTeamInvitation = postLoginRedirectPath?.startsWith('/jointeam?token=') ?? false;

  return (
    <main className="bg-background-secondary grid min-h-screen place-items-center p-4">
      <section className="bg-background-primary w-full max-w-[550px] rounded-2xl p-8 md:p-18">
        <h1 className={`${isTeamInvitation ? 'mb-8' : 'mb-12'} text-center text-xl font-semibold`}>
          로그인
        </h1>
        {isTeamInvitation && (
          <aside
            role="status"
            className="bg-brand-secondary text-brand-primary mb-8 flex items-start gap-3 rounded-lg px-4 py-3"
          >
            <AlertIcon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <strong className="text-sm font-semibold">팀 초대를 받으셨어요</strong>
              <p className="text-text-default text-sm leading-5">
                로그인하면 초대받은 팀 참여 화면으로 이동합니다.
              </p>
            </div>
          </aside>
        )}
        <LoginFormSection postLoginRedirectPath={postLoginRedirectPath} />
        <SignupPromptSection />
        <SocialAuthSection label="간편 로그인하기" />
      </section>
    </main>
  );
};

export default LoginPage;
