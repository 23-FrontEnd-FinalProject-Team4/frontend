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
        <KakaoIcon />
      </div>
    </section>
  );
};

export default SocialAuthSection;
