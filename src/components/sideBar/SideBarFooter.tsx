import { User } from '@/apis/auth/type';
import LoggedInFooter from '@/components/sideBar/LoggedInFooter';
import LoggedOutFooter from '@/components/sideBar/LoggedOutFooter';

export default function SideBarFooter({
  collapsed,
  user,
  isLoggedIn,
}: {
  collapsed: boolean;
  user: User | undefined;
  isLoggedIn: boolean;
}) {
  return user ? (
    <LoggedInFooter isLoggedIn={isLoggedIn} collapsed={collapsed} user={user} />
  ) : (
    <LoggedOutFooter collapsed={collapsed} />
  );
}
