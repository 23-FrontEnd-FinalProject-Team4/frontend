import LoggedInFooter from '@/components/sideBar/LoggedInFooter';
import LoggedOutFooter from '@/components/sideBar/LoggedOutFooter';

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
