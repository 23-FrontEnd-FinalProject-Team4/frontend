import { User } from '@/apis/auth/type';

export type Group = {
  id: number;
  name: string;
  route?: string;
  image?: string | null;
};

export type GroupItemProps = Group & {
  collapsed: boolean;
  selected?: boolean;
};

export type GroupSectionProps = {
  groups: Group[];
  collapsed: boolean;
};

export type SideBarProps = {
  isLoggedIn: boolean;
  groups: Group[];
  user: User | undefined;
  isAuthLoading: boolean;
};

export type SideBarViewProps = {
  isLoggedIn: boolean;
  collapsed: boolean;
  groups: Group[];
  onToggleCollapse: () => void;
};

export type SideBarFooterProps = {
  isLoggedIn: boolean;
  collapsed: boolean;
};

export type MobileHeaderProps = {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  onOpenSideBar: () => void;
  user: User | undefined;
  groups: Group[];
};

export type MobileSidebarProps = {
  mobileOpen: boolean;
  groups: Group[];
  onCloseMobileMenu: () => void;
};
