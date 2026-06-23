import { Suspense } from 'react';

import ArticlesClient from '@/app/(protected)/articles/_components/ArticlesClient';

const ArticlesPage = () => {
  return (
    <Suspense fallback={null}>
      <ArticlesClient />
    </Suspense>
  );
};

export default ArticlesPage;
