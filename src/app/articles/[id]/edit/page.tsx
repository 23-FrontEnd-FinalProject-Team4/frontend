import Link from 'next/link';

import { getArticleDetail } from '@/apis/article';
import EditorClient from '@/app/articles/write/_components/EditorClient';

const EditArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleDetail(`${id}`);

  return (
    <div className="mx-auto flex min-h-screen px-4 pt-5 md:p-20">
      <main className="min-h-screen w-full">
        <div className="bg-background-primary mx-auto flex w-full flex-col gap-4 rounded-2xl px-5 py-10 md:px-10 md:py-14 lg:max-w-[900px]">
          <h1 className="mb-8 text-xl font-bold md:text-2xl">게시글 수정</h1>
          <EditorClient
            mode="edit"
            defaultValues={{
              id: `${article.id}`,
              title: article.title,
              content: article.content,
              image: article.image ?? null,
            }}
          />
        </div>
        <div className="flex w-full justify-center pt-8">
          {/* TODO : 수정 전 글로 이동 */}
          <Link
            href="/articles"
            className="text-text-secondary text-md hover:text-brand-primary px-3"
          >
            목록으로
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EditArticlePage;
