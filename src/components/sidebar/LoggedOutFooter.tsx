import Link from 'next/link';

import ProfileIcon from '@/assets/icons/profile.svg?react';

export default function LoggedOutFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex flex-row justify-between border-t border-[#E2E8F0] pt-6">
      <Link href="/login" className="flex flex-row items-center gap-3">
        {collapsed ? null : <ProfileIcon className="h-10 w-10" />}
        로그인
      </Link>
    </div>
  );
}
