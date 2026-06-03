import Sidebar from '@/components/sideBar/SideBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background-secondary flex min-h-screen">
      <Sidebar isLoggedIn={true} groups={[]} />

      <main className="flex-1 pt-16 md:pt-0">{children}</main>
    </div>
  );
}
