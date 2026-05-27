import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ModalVariant = 'default' | 'danger';
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalAction {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  variant?: ModalVariant;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  closeOnOverlayClick?: boolean;
  className?: string;
  contentClassName?: string;
  onClose: () => void;
}
