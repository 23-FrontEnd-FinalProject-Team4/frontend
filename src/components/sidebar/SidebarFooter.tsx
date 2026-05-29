import LoggedInFooter from '@/components/sidebar/LoggedInFooter';
import LoggedOutFooter from '@/components/sidebar/LoggedOutFooter';

export default function SidebarFooter({ isLoggedIn, collapsed }: { isLoggedIn: boolean, collapsed: boolean }) {
  return isLoggedIn ? <LoggedInFooter collapsed={collapsed} /> : <LoggedOutFooter collapsed={collapsed} />;
}
