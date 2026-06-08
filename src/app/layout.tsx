import type { Metadata } from 'next';

import '@/app/globals.css';

import Sidebar from '@/components/sideBar/SideBar';

export const metadata: Metadata = {
  title: 'Coworkers',
  description: 'Coworkers project',
};

// 리스트를 보여주기 위한 데이터
const SIDEBAR_GROUPS = [
  { id: 1, name: '경영관리팀', route: '/management' },
  { id: 2, name: '프로덕트팀', route: '/product' },
  { id: 3, name: '마케팅팀', route: '/marketing' },
  { id: 4, name: '콘텐츠팀', route: '/content' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="bg-background-secondary flex min-h-screen">
          <Sidebar isLoggedIn={true} groups={SIDEBAR_GROUPS} />

          <main className="flex-1 pt-16 md:pt-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
