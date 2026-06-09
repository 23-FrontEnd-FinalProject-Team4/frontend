'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface OverlayControl {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}

export type OverlayRenderer = (overlay: OverlayControl) => ReactNode;

interface UseOverlayReturn {
  isOpen: boolean;
  open: (nextRenderer: OverlayRenderer) => void;
  close: () => void;
  exit: () => void;
  overlay: ReactNode;
}

export default function useOverlay(): UseOverlayReturn {
  const [renderer, setRenderer] = useState<OverlayRenderer | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const exit = useCallback(() => {
    setIsOpen(false);
    setRenderer(null);
  }, []);

  const close = exit;

  const open = useCallback((nextRenderer: OverlayRenderer) => {
    setRenderer(() => nextRenderer);
    setIsOpen(true);
  }, []);

  const overlay = useMemo(() => {
    if (!renderer) {
      return null;
    }

    return renderer({ isOpen, close, exit });
  }, [close, exit, isOpen, renderer]);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
      exit,
      overlay,
    }),
    [close, exit, isOpen, open, overlay],
  );
}
