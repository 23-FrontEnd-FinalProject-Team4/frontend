import { User } from '@/apis/auth/type';
import LoggedInFooter from '@/components/sideBar/LoggedInFooter';
import LoggedOutFooter from '@/components/sideBar/LoggedOutFooter';

export default function SideBarFooter({
  collapsed,
  user,
  isLoggedIn,
  isAuthLoading,
}: {
  collapsed: boolean;
  user: User | undefined;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
}) {
  if (isAuthLoading) {
    return <div className="h-16" />;
  }

  if (!isLoggedIn) {
    return <LoggedOutFooter collapsed={collapsed} />;
  }

  if (user === undefined) {
    return <div className="h-16" />;
  }

  return <LoggedInFooter isLoggedIn={isLoggedIn} collapsed={collapsed} user={user} />;
}
