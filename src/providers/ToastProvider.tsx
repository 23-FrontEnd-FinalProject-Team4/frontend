'use client';

import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          className:
            'bg-background-primary text-text-primary text-md rounded-xl px-6 py-3 font-medium border border-border-primary shadow-lg md:text-lg',
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'var(--color-background-primary)',
            },
          },
          error: {
            iconTheme: {
              primary: '#fc4b4b',
              secondary: 'var(--color-background-primary)',
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider;
