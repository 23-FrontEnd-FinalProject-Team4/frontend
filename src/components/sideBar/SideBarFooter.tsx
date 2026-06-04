import LoggedInFooter from '@/components/sideBar/LoggedInFooter';
import LoggedOutFooter from '@/components/sideBar/LoggedOutFooter';

export default function SideBarFooter({
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
