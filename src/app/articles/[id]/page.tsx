import Link from 'next/link';

import { getArticleDetail } from '@/apis/article';
import type { ArticleComment } from '@/apis/articleComment/type';
import CommentSection from '@/app/articles/_components/articlesDetail/CommentSection';
import ArticleContent from '@/app/articles/_components/articlesDetail/Content';
import ArticleHeader from '@/app/articles/_components/articlesDetail/Header';
import LikeButton from '@/app/articles/_components/articlesDetail/LikeButton';
import ArrowLeft from '@/assets/icons/arrow_left.svg';

const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleDetail(`${id}`);
  const comments: ArticleComment[] = [];
  const formattedDate = new Date(article.createdAt).toISOString().slice(0, 10).replace(/-/g, '. ');
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
            id={`${article.id}`}
            title={article.title}
            writer={article.writer.nickname}
            createdAt={formattedDate}
          />
          <ArticleContent content={article.content} image={article.image} />
          <LikeButton isLiked={article.isLiked} likeCount={article.likeCount} />
          <CommentSection comments={comments} />
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
