import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { hasAuthTokens } from '@/utils/auth/token';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const isLoggedIn = await hasAuthTokens();

  if (!isLoggedIn) {
    redirect('/login');
  }

  return <>{children}</>;
};

export default ProtectedLayout;
