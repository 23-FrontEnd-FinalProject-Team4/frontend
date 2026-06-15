import ArticleCard from '@/app/articles/_components/Card';
import type { ArticleWithLike } from '@/app/articles/_components/Card.type';

import DropdownMd from '@/components/dropdown/DropdownMd';

const SORT_OPTIONS = ['최신순', '좋아요 많은순'];

const ListSection = ({ articles }: { articles: ArticleWithLike[] }) => {
  return (
    <div className="flex flex-col gap-5 p-7 xl:p-0">
      <div className="flex flex-row justify-between">
        <h1 className="text-text-primary text-2xl font-bold">전체</h1>
        <DropdownMd options={SORT_OPTIONS}>
          <div>전체</div>
        </DropdownMd>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="normal" />
        ))}
      </div>
    </div>
  );
};

export default ListSection;
