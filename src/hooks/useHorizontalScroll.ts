'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_AMOUNT = 300;
const DRAG_THRESHOLD = 10;

interface ScrollState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  isDragging: boolean;
}

export default function useHorizontalScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isDraggingRef = useRef(false);

  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: false,
    isDragging: false,
  });

  const updateScrollState = useCallback(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;

    setScrollState((prev) => ({
      ...prev,
      canScrollLeft: scrollElement.scrollLeft > 0,
      canScrollRight: scrollElement.scrollLeft < maxScrollLeft - 1,
    }));
  }, []);

  const scrollByDirection = useCallback(
    (direction: 'left' | 'right') => {
      const scrollElement = scrollRef.current;

      if (!scrollElement) {
        return;
      }

      scrollElement.scrollBy({
        left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: 'smooth',
      });

      window.setTimeout(updateScrollState, 250);
    },
    [updateScrollState],
  );

  const handlePointerDown = useCallback((event: React.PointerEvent<T>) => {
    const scrollElement = scrollRef.current;

    if (
      event.button !== 0 ||
      !scrollElement ||
      scrollElement.scrollWidth <= scrollElement.clientWidth
    ) {
      return;
    }

    startXRef.current = event.clientX;
    startScrollLeftRef.current = scrollElement.scrollLeft;
    hasDraggedRef.current = false;
    isDraggingRef.current = true;
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<T>) => {
    const scrollElement = scrollRef.current;

    if (!scrollElement || !isDraggingRef.current) {
      return;
    }

    const movedDistance = event.clientX - startXRef.current;

    if (!hasDraggedRef.current && Math.abs(movedDistance) > DRAG_THRESHOLD) {
      hasDraggedRef.current = true;
      scrollElement.setPointerCapture(event.pointerId);
      setScrollState((prev) => ({ ...prev, isDragging: true }));
    }

    if (!hasDraggedRef.current) {
      return;
    }

    event.preventDefault();
    scrollElement.scrollLeft = startScrollLeftRef.current - movedDistance;
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<T>) => {
      const scrollElement = scrollRef.current;

      if (scrollElement?.hasPointerCapture(event.pointerId)) {
        scrollElement.releasePointerCapture(event.pointerId);
      }

      isDraggingRef.current = false;
      setScrollState((prev) => ({ ...prev, isDragging: false }));
      updateScrollState();

      if (hasDraggedRef.current) {
        window.setTimeout(() => {
          hasDraggedRef.current = false;
        }, 0);
      }
    },
    [updateScrollState],
  );

  const handleClickCapture = useCallback((event: React.MouseEvent<T>) => {
    if (!hasDraggedRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    updateScrollState();

    scrollElement.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      scrollElement.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  return {
    scrollRef,
    canScrollLeft: scrollState.canScrollLeft,
    canScrollRight: scrollState.canScrollRight,
    isDragging: scrollState.isDragging,
    scrollByDirection,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      onClickCapture: handleClickCapture,
    },
  };
}
