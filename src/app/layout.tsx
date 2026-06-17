import type { Metadata } from 'next';

import '@/app/globals.css';
import AppShell from '@/components/AppShell';
import OverlayProvider from '@/providers/OverlayProvider';
import QueryProvider from '@/providers/QueryProvider';
import ToastProvider from '@/providers/ToastProvider';

export const metadata: Metadata = {
  title: 'Coworkers',
  description: 'Coworkers project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
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
