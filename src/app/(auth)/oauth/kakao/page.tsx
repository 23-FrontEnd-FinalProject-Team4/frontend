import { redirect } from 'next/navigation';

import { signInWithOAuth } from '@/apis/auth/server';
import { setAuthTokens } from '@/utils/auth/token';

interface KakaoRedirectPageProps {
  searchParams: Promise<{
    code?: string;
    error?: string;
  }>;
}

const KakaoRedirectPage = async ({ searchParams }: KakaoRedirectPageProps) => {
  const { code, error } = await searchParams;
  console.log('4', { hasCode: !!code, error });

  if (error || !code) {
    console.log('4-1', 'redirect to /login (missing code or error)');
    redirect('/login');
  }

  console.log('5', { code });
  const result = await signInWithOAuth('KAKAO', {
    token: code,
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
  });

  console.log('6', { hasAccessToken: !!result.accessToken });
  await setAuthTokens({
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  console.log('7', 'redirect to /');
  redirect('/');
};

export default KakaoRedirectPage;
