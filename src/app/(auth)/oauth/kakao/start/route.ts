import { NextRequest, NextResponse } from 'next/server';

import { getSafeRedirectPath } from '@/lib/auth/postLoginRedirect';
import { getSiteUrl } from '@/utils/url';

export async function GET(request: NextRequest) {
  const kakaoApiKey = process.env.KAKAO_REST_API_KEY;
  const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI;
  const redirectPath = getSafeRedirectPath(request.nextUrl.searchParams.get('redirect'));
  const siteUrl = getSiteUrl(request);

  if (!kakaoApiKey || !kakaoRedirectUri) {
    return NextResponse.redirect(new URL('/login?error=config_error', siteUrl));
  }

  const params = new URLSearchParams({
    client_id: kakaoApiKey,
    redirect_uri: kakaoRedirectUri,
    response_type: 'code',
  });

  if (redirectPath) {
    params.set('state', redirectPath);
  }

  return NextResponse.redirect(`https://kauth.kakao.com/oauth/authorize?${params.toString()}`);
}
