import { RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent) => void) {
  useEffect(() => {
    // 마우스 이벤트 발생시, 클릭한 타겟이 ref가 아니면 handler 호출
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}
