'use client';

import Link from 'next/link';

import MenuIcon from '@/assets/icons/gnb_menu.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';
import ProfileIcon from '@/assets/icons/profile.svg?react';
import { cn } from '@/utils/cn';

import type { MobileHeaderProps } from '@/components/sideBar/type';

export default function MobileHeader({ isLoggedIn, onOpenSideBar }: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'bg-background-primary border-brand-secondary fixed flex h-16 w-full items-center justify-between border px-5 md:hidden',
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
          <Link href="/">
            <LogoSmall className="h-6 w-6" />
          </Link>
        ) : (
          <Link href="/">
            <LogoLarge className="h-6" />
          </Link>
        )}
      </div>

      {isLoggedIn ? (
        <button type="button">
          <ProfileIcon className="h-8 w-8" />
        </button>
      ) : (
        <Link href="/login" className={cn('text-brand-tertiary text-md')}>
          로그인
        </Link>
      )}
    </header>
  );
}
