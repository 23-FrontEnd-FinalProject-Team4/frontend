'use client';

import { useCallback, useSyncExternalStore } from 'react';

export const MEDIA_QUERY = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
} as const;
type MediaQuery = (typeof MEDIA_QUERY)[keyof typeof MEDIA_QUERY];

export default function useMediaQuery(query: MediaQuery) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);

      mediaQuery.addEventListener('change', callback);

      return () => {
        mediaQuery.removeEventListener('change', callback);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
