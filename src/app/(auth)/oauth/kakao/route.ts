import { NextRequest, NextResponse } from 'next/server';

import { signInWithOAuth } from '@/apis/auth/server';
import { getPostLoginRedirectPath } from '@/lib/auth/postLoginRedirect';
import { setAuthTokens } from '@/utils/auth/token';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');
  const redirectPath = request.nextUrl.searchParams.get('state');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || request.nextUrl.origin;

  const redirectUri = process.env.KAKAO_REDIRECT_URI;

  if (error || !code || !redirectUri) {
    return NextResponse.redirect(new URL('/login', siteUrl));
  }

  try {
    const { accessToken, refreshToken } = await signInWithOAuth('KAKAO', {
      token: code,
      redirectUri,
    });

    await setAuthTokens({ accessToken, refreshToken });

    const postLoginRedirectPath = await getPostLoginRedirectPath({ redirectPath });

    return NextResponse.redirect(new URL(postLoginRedirectPath, siteUrl));
  } catch {
    return NextResponse.redirect(new URL('/login?error=oauth_failed', siteUrl));
  }
}
