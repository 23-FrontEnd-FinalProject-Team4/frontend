export type DropdownMdProps = {
  children: React.ReactNode;
  size?: 'md' | 'sm';
  menuOpen?: boolean;
  options: string[];
  onSelect?: (value: string) => void;
};

export type DropdownProps = {
  size?: 'md' | 'sm';
  options: {
    label: string;
    value: string;
  }[];
  onSelect?: (value: string) => void;
};
