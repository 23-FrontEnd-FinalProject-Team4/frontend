import ArticleCard from '@/components/articles/ArticleCard';
import type { ArticleWithLike } from '@/components/articles/ArticleCard.type';
import DropdownMd from '@/components/dropdown/DropdownMd';

const ArticleListSection = ({ articles }: { articles: ArticleWithLike[] }) => {
  return (
    <div className="flex flex-col gap-5 p-7 lg:p-0">
      <div className="flex flex-row justify-between">
        <h1 className="text-text-primary text-2xl font-bold">전체</h1>
        <DropdownMd options={['최신순', '좋아요 많은순']}>
          <div>전체</div>
        </DropdownMd>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="normal" />
        ))}
      </div>
    </div>
  );
};

export default ArticleListSection;
