'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getMyGroupsAction } from '@/app/_actions/sidebar.action';
import type { Group } from '@/components/sideBar/type';

const Sidebar = dynamic(() => import('@/components/sideBar/SideBar'), {
  ssr: false,
});

const FALLBACK_SIDEBAR_GROUPS: Group[] = [
  { id: 1, name: '경영관리팀', route: '/management' },
  { id: 2, name: '프로덕트팀', route: '/product' },
  { id: 3, name: '마케팅팀', route: '/marketing' },
  { id: 4, name: '콘텐츠팀', route: '/content' },
];

const SIDEBAR_QUERY_KEY = {
  myGroups: ['sidebar', 'my-groups'] as const,
};

const PUBLIC_PAGE_PATHS = new Set(['/', '/login', '/signup', '/reset-password']);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PAGE_PATHS.has(pathname);

  const { data: myGroups } = useQuery({
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

  const sidebarGroups =
    myGroups?.map((group) => ({
      id: group.id,
      name: group.name,
      route: `/${group.id}`,
      image: group.image,
    })) ?? FALLBACK_SIDEBAR_GROUPS;

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-background-secondary flex min-h-screen">
      <Sidebar isLoggedIn={true} groups={sidebarGroups} />

      <main className="flex-1 pt-16 md:pt-0">{children}</main>
    </div>
  );
}
