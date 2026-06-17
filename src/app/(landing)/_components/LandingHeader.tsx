import Link from 'next/link';

import LogoLargeIcon from '@/assets/icons/logo_large.svg?react';

function CoworkersLogo() {
  return (
    <Link
      href="/"
      aria-label="Coworkers 홈"
      className="hover:text-interaction-hover flex items-center transition-colors"
    >
      <LogoLargeIcon className="h-4.5 w-auto shrink-0" aria-hidden="true" />
    </Link>
  );
}

export default function LandingHeader() {
  return (
    <header className="border-border-primary bg-background-primary/95 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-10 xl:px-16">
        <CoworkersLogo />

        <Link
          href="/login"
          className="text-text-primary hover:text-brand-primary focus-visible:ring-brand-primary text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
