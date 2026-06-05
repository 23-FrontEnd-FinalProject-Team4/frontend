'use client';

import { useEffect, useId, useSyncExternalStore } from 'react';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import AlertIcon from '@/assets/icons/alert.svg?react';
import { cn } from '@/utils/cn';

import Button from '../button/Button';
import type { ButtonVariant } from '../button/type';
import type { ModalAction, ModalProps, ModalSize, ModalVariant } from './type';

type ModalButtonVariant = 'primary' | 'secondary';

interface ModalButtonProps {
  action: ModalAction;
  variant: ModalButtonVariant;
  modalVariant: ModalVariant;
}

const MODAL_SIZE_CLASS: Record<ModalSize, string> = {
  sm: 'w-full max-w-[280px]',
  md: 'w-full max-w-[320px]',
  lg: 'w-full max-w-[420px]',
};

const PRIMARY_BUTTON_VARIANT: Record<ModalVariant, ButtonVariant> = {
  default: 'primary-filled',
  danger: 'danger-filled',
};

const subscribeToClientStore = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

let openModalsCount = 0;
let originalBodyOverflow = '';

const getActionButtonLabel = ({ isLoading, label, loadingLabel = '처리 중' }: ModalAction) => {
  if (isLoading) {
    return loadingLabel;
  }

  return label;
};

const getModalButtonVariant = (
  variant: ModalButtonVariant,
  modalVariant: ModalVariant,
): ButtonVariant => {
  if (variant === 'secondary') {
    return 'secondary-whiteFilled';
  }

  return PRIMARY_BUTTON_VARIANT[modalVariant];
};

const ModalButton = ({ action, variant, modalVariant }: ModalButtonProps) => {
  return (
    <Button
      type={action.buttonType ?? 'button'}
      variant={getModalButtonVariant(variant, modalVariant)}
      className="h-10 min-w-0 flex-1 rounded-md px-4 py-0 text-xs font-semibold"
      disabled={action.disabled || action.isLoading}
      onClick={action.onClick}
    >
      {getActionButtonLabel(action)}
    </Button>
  );
};

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 4L12 12M12 4L4 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Modal = ({
  isOpen,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  variant = 'default',
  size = 'sm',
  showCloseButton = true,
  closeButtonLabel = '모달 닫기',
  closeOnOverlayClick = true,
  className,
  contentClassName,
  onClose,
}: ModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const isClient = useSyncExternalStore(
    subscribeToClientStore,
    getClientSnapshot,
    getServerSnapshot,
  );
  const hasFooter = Boolean(primaryAction || secondaryAction);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    openModalsCount += 1;

    if (openModalsCount === 1) {
      originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      openModalsCount = Math.max(openModalsCount - 1, 0);

      if (openModalsCount === 0) {
        document.body.style.overflow = originalBodyOverflow;
        originalBodyOverflow = '';
      }

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isClient || !isOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
      onClick={handleOverlayClick}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'bg-background-primary relative max-h-[calc(100dvh-64px)] overflow-y-auto rounded-2xl px-6 py-6',
          'shadow-[0_16px_40px_rgb(15_23_42/0.18)]',
          MODAL_SIZE_CLASS[size],
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            aria-label={closeButtonLabel}
            className="hover:bg-background-secondary focus:ring-brand-primary absolute top-3 right-3 flex size-5 items-center justify-center rounded-sm transition-colors focus:ring-2 focus:outline-none"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        )}

        <div className="flex flex-col items-center px-4 text-center">
          {variant === 'danger' && (
            <AlertIcon className="mb-4 size-6" aria-hidden="true" />
          )}

          <h2 id={titleId} className="text-text-primary text-sm font-semibold">
            {title}
          </h2>

          {description && (
            <p id={descriptionId} className="text-text-default mt-2 text-xs whitespace-pre-line">
              {description}
            </p>
          )}
        </div>

        {children && <div className={cn('mt-6', contentClassName)}>{children}</div>}

        {hasFooter && (
          <div className="mt-6 flex gap-2">
            {secondaryAction && (
              <ModalButton action={secondaryAction} variant="secondary" modalVariant={variant} />
            )}

            {primaryAction && (
              <ModalButton action={primaryAction} variant="primary" modalVariant={variant} />
            )}
          </div>
        )}
      </section>
    </div>
  );

  return createPortal(modal, document.body);
};

export default Modal;
