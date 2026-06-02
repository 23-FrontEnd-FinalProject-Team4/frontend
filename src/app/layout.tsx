import type { Metadata } from 'next';

import '@/app/globals.css';

import Sidebar from '@/components/sidebar/Sidebar';

export const metadata: Metadata = {
  title: 'Coworkers',
  description: 'Coworkers project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="bg-background-secondary flex h-screen w-full">
          <Sidebar isLoggedIn={true} groups={[]} />
          <main className="flex-1 pt-16 md:pt-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
