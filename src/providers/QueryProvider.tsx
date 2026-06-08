'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분 동안은 데이터가 '신선함' 상태라고 판단해 중복 호출 방지
        gcTime: 5 * 60 * 1000, // 쓰이지 않는 캐시 데이터는 5분 뒤 메모리에서 자동 정리
        retry: 1, // API 실패 시 딱 1번만 재시도
        refetchOnWindowFocus: false, // 사용자가 브라우저 창을 다시 포커스했을 때 자동 리패칭 끄기
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
