import LoggedInFooter from '@/components/sidebardddd/LoggedInFooter';
import LoggedOutFooter from '@/components/sidebardddd/LoggedOutFooter';

export default function SidebarFooter({
  isLoggedIn,
  collapsed,
}: {
  isLoggedIn: boolean;
  collapsed: boolean;
}) {
  return isLoggedIn ? (
    <LoggedInFooter collapsed={collapsed} />
  ) : (
    <LoggedOutFooter collapsed={collapsed} />
  );
}
