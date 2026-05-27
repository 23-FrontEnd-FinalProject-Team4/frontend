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
        <div className="bg-background-secondary m-auto flex h-screen w-full">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
