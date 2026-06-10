import Link from 'next/link';

import { mockArticles, mockComments } from '@/app/articles/mockArticles';
import ArrowLeft from '@/assets/icons/arrow_left.svg';

import ArticleContent from '@/components/articlesDetail/ArticleContent';
import ArticleHeader from '@/components/articlesDetail/ArticleHeader';
import CommentSection from '@/components/articlesDetail/CommentSection';
import LikeButton from '@/components/articlesDetail/LikeButton';

const ArticleDetailPage = () => {
  const article = mockArticles[0];
  const comments = mockComments;
  const handleLikeClick = () => {
    console.log('like button clicked');
  };
  return (
    <div className="mx-auto flex min-h-screen px-4 pt-5 md:p-22">
      <main className="min-h-screen w-full">
        {/* TODO: 게시글 목록, 이전글, 다음글 */}
        <Link href="/articles" className="text-text-default mb-4 flex items-center gap-1">
          <ArrowLeft className="mb-0.25 h-4 w-4" />
          <span className="text-md">게시판 목록</span>
        </Link>
        <div className="bg-background-primary mx-auto flex w-full flex-col gap-4 rounded-2xl px-5 py-10 md:px-10 md:py-14">
          <ArticleHeader
            title={article.title}
            writer={article.writer}
            createdAt={article.createdAt}
          />
          <ArticleContent content={article.content} image={article.image} />
          {/* 좋아요 클릭 핸들러 구현 */}
          <LikeButton
            isLiked={article.isLiked}
            likeCount={article.likeCount}
            onLikeClick={() => {
              handleLikeClick();
            }}
          />
          <CommentSection comments={comments} />
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
