import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import AppShell from '@/components/AppShell';
import { hasAuthTokens } from '@/utils/auth/token';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const isLoggedIn = await hasAuthTokens();

  if (!isLoggedIn) {
    redirect('/login');
  }

  return <AppShell>{children}</AppShell>;
};

export default ProtectedLayout;
