'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getMyGroupsAction } from '@/app/_actions/sidebar.action';
import { getMyProfileAction } from '@/app/_actions/user.action';

const Sidebar = dynamic(() => import('@/components/sideBar/SideBar'), {
  ssr: false,
});

const SIDEBAR_QUERY_KEY = {
  myGroups: ['sidebar', 'my-groups'] as const,
};

const PUBLIC_PAGE_PATHS = new Set(['/', '/login', '/signup', '/reset-password']);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PAGE_PATHS.has(pathname);

  const { data: myGroups, isSuccess } = useQuery({
    queryKey: SIDEBAR_QUERY_KEY.myGroups,
    queryFn: async () => {
      const result = await getMyGroupsAction();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    enabled: !isPublicPage,
  });
  const isLoggedIn = isSuccess;
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await getMyProfileAction();
      return result;
    },
    enabled: isLoggedIn,
  });

  const sidebarGroups =
    myGroups?.map((group) => ({
      id: group.id,
      name: group.name,
      route: `/${group.id}`,
      image: group.image,
    })) ?? [];

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-background-secondary flex min-h-screen">
      <Sidebar isLoggedIn={isLoggedIn} groups={sidebarGroups} user={user} />

      <main className="flex-1 pt-16 md:pt-0">{children}</main>
    </div>
  );
}
