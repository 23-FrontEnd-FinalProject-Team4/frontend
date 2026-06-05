import type { Metadata } from 'next';

import '@/app/globals.css';
import ToastProvider from '@/providers/ToastProvider';

import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Coworkers',
  description: 'Coworkers project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
