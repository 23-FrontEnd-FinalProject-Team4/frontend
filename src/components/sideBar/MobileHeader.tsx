'use client';

import Link from 'next/link';

import MenuIcon from '@/assets/icons/gnb_menu.svg?react';
import LogoLarge from '@/assets/icons/logo_large.svg?react';
import LogoSmall from '@/assets/icons/logo_small.svg?react';
import ProfileIcon from '@/assets/icons/profile.svg?react';

import type { MobileHeaderProps } from './type';

export default function MobileHeader({ isLoggedIn, onOpenSidebar }: MobileHeaderProps) {
  return (
    <header className="bg-background-primary border-brand-secondary fixed flex h-16 w-full items-center justify-between border px-5 md:hidden">
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button type="button" onClick={onOpenSidebar}>
            <MenuIcon className="h-6 w-6" />
          </button>
        ) : (
          ''
        )}
        {isLoggedIn ? <LogoSmall className="h-6 w-6" /> : <LogoLarge className="h-6" />}
      </div>

      {isLoggedIn ? (
        <button type="button">
          <ProfileIcon className="h-8 w-8" />
        </button>
      ) : (
        <Link href="/login" className="text-brand-tertiary text-md">
          로그인
        </Link>
      )}
    </header>
  );
}
