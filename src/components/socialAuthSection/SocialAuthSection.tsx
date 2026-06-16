import Link from 'next/link';

import KakaoIcon from '@/assets/icons/kakaotalk.svg';
import Divider from '@/components/divider/Divider';

interface SocialAuthSectionProps {
  label: string;
}

const SocialAuthSection = ({ label }: SocialAuthSectionProps) => {
  return (
    <section className="mt-6">
      <Divider className="mb-4" />
      <div className="flex items-center justify-between">
        <span className="text-md text-text-default">{label}</span>
        <Link
          href="/oauth/kakao/start"
          className="text-md text-text-default flex items-center gap-2"
        >
          <KakaoIcon aria-hidden />
          <span>카카오 로그인</span>
        </Link>
      </div>
    </section>
  );
};

export default SocialAuthSection;
