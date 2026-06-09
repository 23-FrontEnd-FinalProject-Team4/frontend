import KakaoIcon from '@/assets/icons/kakaotalk.svg';

import Divider from '@/components/divider/Divider';

const SocialLoginSection = () => {
  return (
    <section className="mt-6">
      <Divider className="mb-4" />
      <div className="flex items-center justify-between">
        <span className="text-md text-text-default">간편 로그인하기</span>
        <KakaoIcon />
      </div>
    </section>
  );
};

export default SocialLoginSection;
