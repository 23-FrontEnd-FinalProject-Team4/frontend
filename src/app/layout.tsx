import localFont from 'next/font/local';

import type { Metadata } from 'next';

import '@/app/globals.css';
import AppShell from '@/components/AppShell';
import OverlayProvider from '@/providers/OverlayProvider';
import QueryProvider from '@/providers/QueryProvider';
import ToastProvider from '@/providers/ToastProvider';

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Light.subset.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://www.coworkers23.xyz';

const SITE_DESCRIPTION =
  '팀원과 함께 할 일을 관리하고, 일정과 게시글로 협업을 이어가는 팀 협업 서비스입니다.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Coworkers',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'Coworkers',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Coworkers',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <QueryProvider>
          <OverlayProvider>
            <ToastProvider>
              <AppShell>{children}</AppShell>
            </ToastProvider>
          </OverlayProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
