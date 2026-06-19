import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getArticleDetailServer } from '@/apis/article/server';
import { getMyProfileServer } from '@/apis/user/server';
import EditorClient from '@/app/articles/write/_components/EditorClient';

const EditArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const article = await getArticleDetailServer(`${id}`);
  let currentUserId = '';

  try {
    const profile = await getMyProfileServer();
    currentUserId = String(profile.id);
  } catch {
    notFound();
  }

  if (currentUserId !== String(article.writer.id)) {
    notFound();
  }

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
        <div className="mt-5 flex w-full justify-center pr-2">
          <Link href="/articles" className="text-text-default">
            <span className="text-lg">목록으로</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EditArticlePage;
