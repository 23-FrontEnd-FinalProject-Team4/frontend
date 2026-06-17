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
  onOpenSideBar: () => void;
};

export type MobileSidebarProps = {
  mobileOpen: boolean;
  groups: Group[];
  onCloseMobileMenu: () => void;
};
