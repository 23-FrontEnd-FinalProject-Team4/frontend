'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { User } from '@/apis/auth/type';
import MenuIcon from '@/assets/icons/gnb_menu.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';
import ProfileIcon from '@/assets/icons/profile.svg?react';
import { handleOpenProfileMenu, openProfileMenu } from '@/components/sideBar/LoggedInFooter';
import type { Group } from '@/components/sideBar/type';
import { cn } from '@/utils/cn';

import Dropdown from '../dropdown/Dropdown';

export default function MobileHeader({
  isLoggedIn,
  user,
  onOpenSideBar,
  groups,
}: {
  isLoggedIn: boolean;
  user: User | undefined;
  onOpenSideBar: () => void;
  groups: Group[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const logoHref = isLoggedIn && groups.length > 0 ? `/${groups[0].id}` : '/';
  return (
    <header
      className={cn(
        'bg-background-primary border-brand-secondary fixed z-20 flex h-16 w-full items-center justify-between border px-5 md:hidden',
      )}
    >
      <div className={cn('flex items-center gap-4')}>
        {isLoggedIn ? (
          <button type="button" onClick={onOpenSideBar}>
            <MenuIcon className="h-6 w-6" />
          </button>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <Link href={logoHref}>
            <LogoSmall className="h-6 w-6" />
          </Link>
        ) : (
          <Link href="/">
            <LogoLarge className="h-6" />
          </Link>
        )}
      </div>

      {user ? (
        <div className="relative z-10">
          <button type="button" onClick={toggleOpen}>
            <ProfileIcon className="h-8 w-8" />
          </button>

          {isOpen && (
            <div className="absolute right-20 bottom-0">
              <Dropdown
                size="sm"
                options={openProfileMenu()}
                onSelect={async (value) => {
                  await handleOpenProfileMenu(value, router);
                }}
                onClose={toggleOpen}
              />
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className={cn('text-brand-tertiary text-md')}>
          로그인
        </Link>
      )}
    </header>
  );
}
