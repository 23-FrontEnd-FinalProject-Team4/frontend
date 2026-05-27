'use client';

import { useEffect, useId, useSyncExternalStore } from 'react';
import type { MouseEvent } from 'react';

import Image from 'next/image';

import alertIcon from '@/assets/icons/alert.svg';
import closeIcon from '@/assets/icons/x.svg';
import { createPortal } from 'react-dom';

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

const PRIMARY_BUTTON_CLASS: Record<ModalVariant, string> = {
  default: 'bg-brand-primary text-white hover:bg-interaction-hover active:bg-interaction-pressed',
  danger: 'bg-status-danger text-white hover:bg-red-700 active:bg-red-800',
};

const SECONDARY_BUTTON_CLASS =
  'border-brand-primary text-brand-primary hover:bg-slate-50 disabled:border-interaction-inactive disabled:text-interaction-inactive';

const subscribeToClientStore = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const cn = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(' ');

const getActionButtonLabel = ({ isLoading, label, loadingLabel = 'Loading' }: ModalAction) => {
  if (isLoading) {
    return loadingLabel;
  }

  return label;
};

const ModalButton = ({ action, variant, modalVariant }: ModalButtonProps) => {
  const buttonClassName = cn(
    'h-10 min-w-0 flex-1 rounded-md px-4 text-xs font-semibold transition-colors',
    'focus:ring-brand-primary focus:ring-2 focus:outline-none disabled:cursor-not-allowed',
    variant === 'primary' && 'disabled:bg-interaction-inactive',
    variant === 'primary' && PRIMARY_BUTTON_CLASS[modalVariant],
    variant === 'secondary' && 'border bg-white',
    variant === 'secondary' && SECONDARY_BUTTON_CLASS,
  );

  return (
    <button
      type={action.buttonType ?? 'button'}
      className={buttonClassName}
      disabled={action.disabled || action.isLoading}
      onClick={action.onClick}
    >
      {getActionButtonLabel(action)}
    </button>
  );
};

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
  closeButtonLabel = 'Close modal',
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

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isClient || !isOpen) {
    return null;
  }

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
      onMouseDown={handleOverlayMouseDown}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'bg-background-inverse relative max-h-[calc(100vh-64px)] overflow-y-auto rounded-2xl px-6 py-6',
          'shadow-[0_16px_40px_rgb(15_23_42/0.18)]',
          MODAL_SIZE_CLASS[size],
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            aria-label={closeButtonLabel}
            className="focus:ring-brand-primary absolute top-3 right-3 flex size-5 items-center justify-center rounded-sm transition-colors hover:bg-slate-100 focus:ring-2 focus:outline-none"
            onClick={onClose}
          >
            <Image src={closeIcon} width={14} height={14} alt="" aria-hidden />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          {variant === 'danger' && (
            <Image src={alertIcon} width={24} height={24} alt="" aria-hidden className="mb-4" />
          )}

          <h2 id={titleId} className="text-background-primary text-sm font-semibold">
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
