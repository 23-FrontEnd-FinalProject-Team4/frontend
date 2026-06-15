'use client';

import KakaoIcon from '@/assets/icons/kakaotalk.svg';
import Divider from '@/components/divider/Divider';

interface SocialAuthSectionProps {
  label: string;
}

const SocialAuthSection = ({ label }: SocialAuthSectionProps) => {
  const handleKakaoLogin = () => {
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const kakaoLoginUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${kakaoApiKey}` +
      `&redirect_uri=${encodeURIComponent(kakaoRedirectUri!)}` +
      `&response_type=code`;

    window.location.href = kakaoLoginUrl;
  };

  return (
    <section className="mt-6">
      <Divider className="mb-4" />
      <div className="flex items-center justify-between">
        <span className="text-md text-text-default">{label}</span>
        <button
          type="button"
          onClick={handleKakaoLogin}
          className="text-md text-text-default flex items-center gap-2"
        >
          <KakaoIcon />
          <span>카카오 로그인</span>
        </button>
      </div>
    </section>
  );
};

export default SocialAuthSection;
