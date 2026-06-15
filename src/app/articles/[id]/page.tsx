import Link from 'next/link';

import { getArticleDetail } from '@/apis/article';
import { getArticleComments } from '@/apis/articleComment';
import CommentSection from '@/app/articles/_components/articlesDetail/CommentSection';
import ArticleContent from '@/app/articles/_components/articlesDetail/Content';
import ArticleHeader from '@/app/articles/_components/articlesDetail/Header';
import LikeButton from '@/app/articles/_components/articlesDetail/LikeButton';
import ArrowLeft from '@/assets/icons/arrow_left.svg';
import { formatDate } from '@/utils/formatDate';

const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleDetail(`${id}`);
  const comments = await getArticleComments({ articleId: `${id}`, limit: 10, cursor: 0 });
  const formattedDate = formatDate(article.createdAt);
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
          <LikeButton
            articleId={`${article.id}`}
            initialIsLiked={article.isLiked}
            initialLikeCount={article.likeCount}
          />
          <CommentSection articleId={`${article.id}`} comments={comments.list} />
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
