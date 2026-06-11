import type { ReactNode } from 'react';

interface TeamLayoutProps {
  children: ReactNode;
}

const TeamLayout = ({ children }: TeamLayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full items-center justify-center p-4">
      <div className="w-full max-w-[550px]">{children}</div>
    </div>
  );
};

export default TeamLayout;
