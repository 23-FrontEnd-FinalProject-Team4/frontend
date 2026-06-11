import Link from 'next/link';

import ProfileIcon from '@/assets/icons/profile.svg?react';

export default function LoggedOutFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`border-t border-[#E2E8F0] pt-6 ${collapsed ? 'flex justify-center' : ''}`}>
      <Link href="/login" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        {collapsed ? null : <ProfileIcon className="h-10 w-10" />}
        로그인
      </Link>
    </div>
  );
}
