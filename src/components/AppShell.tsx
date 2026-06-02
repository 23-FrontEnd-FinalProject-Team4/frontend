import { cn } from '@/utils/cn';

import Sidebar from '@/components/sideBar/SideBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('bg-background-secondary flex min-h-screen')}>
      <Sidebar isLoggedIn={true} groups={[]} />

      <main className={cn('flex-1 pt-16 md:pt-0')}>{children}</main>
    </div>
  );
}
