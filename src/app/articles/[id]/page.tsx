import { mockArticles } from '@/app/articles/mockArticles';
import { mockComments } from '@/app/articles/mockArticles';

import ArticleContent from '@/components/articlesDetail/ArticleContent';
import ArticleHeader from '@/components/articlesDetail/ArticleHeader';
import CommentSection from '@/components/articlesDetail/CommentSection';
import LikeButton from '@/components/articlesDetail/LikeButton';

const ArticleDetailPage = () => {
  const articles = mockArticles[0];
  const comments = mockComments;
  return (
    <div className="mx-auto flex min-h-screen px-4 pt-5 md:p-22">
      <main className="min-h-screen w-full">
        <div className="bg-background-primary mx-auto flex w-full flex-col gap-4 rounded-2xl px-5 py-10 md:px-10 md:py-14">
          <ArticleHeader
            title={articles.title}
            writer={articles.writer}
            createdAt={articles.createdAt}
          />
          <ArticleContent content={articles.content} image={articles.image} />
          {/* 좋아요 클릭 핸들러 구현 */}
          <LikeButton isLiked={articles.isLiked} likeCount={articles.likeCount} />
          <CommentSection comments={comments} />
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
