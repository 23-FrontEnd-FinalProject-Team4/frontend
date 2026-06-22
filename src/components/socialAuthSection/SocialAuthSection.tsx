import KakaoIcon from '@/assets/icons/kakaotalk.svg';
import Divider from '@/components/divider/Divider';

interface SocialAuthSectionProps {
  label: string;
  redirectPath?: string;
}

const SocialAuthSection = ({ label, redirectPath }: SocialAuthSectionProps) => {
  const kakaoLoginHref = redirectPath
    ? `/oauth/kakao/start?redirect=${encodeURIComponent(redirectPath)}`
    : '/oauth/kakao/start';

  return (
    <section className="mt-6">
      <Divider className="mb-4" />
      <div className="flex items-center justify-between">
        <span className="text-md text-text-default">{label}</span>
        <a href={kakaoLoginHref} className="text-md text-text-default flex items-center gap-2">
          <KakaoIcon aria-hidden />
          <span>카카오 로그인</span>
        </a>
      </div>
    </section>
  );
};

export default SocialAuthSection;
