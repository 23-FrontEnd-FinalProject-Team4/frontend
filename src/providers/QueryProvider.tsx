'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // 앱 전체에서 공유할 QueryClient를 싱글톤 형태로 딱 한 번만 생성합니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분 동안은 데이터가 '신선함' 상태라고 판단해 중복 호출 방지
            gcTime: 5 * 60 * 1000, // 쓰이지 않는 캐시 데이터는 5분 뒤 메모리에서 자동 정리
            retry: 1, // API 실패 시 딱 1번만 재시도
            refetchOnWindowFocus: false, // 사용자가 브라우저 창을 다시 포커스했을 때 자동 리패칭 끄기
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 중에 캐시 상태를 시각적으로 모니터링할 수 있는 개발자 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
