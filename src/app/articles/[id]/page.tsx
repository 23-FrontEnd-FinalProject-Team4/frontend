import Link from 'next/link';

import { getArticleDetail } from '@/apis/article';
import { getArticleComments } from '@/apis/articleComment';
import { getMyProfileServer } from '@/apis/user/server';
import CommentSection from '@/app/articles/_components/articlesDetail/CommentSection';
import ArticleContent from '@/app/articles/_components/articlesDetail/Content';
import ArticleHeader from '@/app/articles/_components/articlesDetail/Header';
import LikeButton from '@/app/articles/_components/articlesDetail/LikeButton';
import { formatDate } from '@/utils/formatDate';

const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleDetail(`${id}`);
  const comments = await getArticleComments({ articleId: `${id}`, limit: 10, cursor: 0 });
  let currentUserIdentifiers: string[] = [];

  try {
    const profile = await getMyProfileServer();
    currentUserIdentifiers = [String(profile.id), profile.teamId].filter(Boolean);
  } catch {
    currentUserIdentifiers = [];
  }

  const formattedDate = formatDate(article.createdAt);
  return (
    <div className="mx-auto flex min-h-screen px-4 pt-5 md:p-22">
      <main className="min-h-screen w-full">
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
          <CommentSection
            articleId={`${article.id}`}
            comments={comments.list}
            currentUserIdentifiers={currentUserIdentifiers}
          />
        </div>

        <div className="mt-5 flex w-full justify-center pr-2">
          <Link href="/articles" className="text-text-default">
            <span className="text-lg">목록으로</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
