import Link from 'next/link';

import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { ArticleEditor } from '@/components/articleEditor/ArticleEditor';
import { articleSchema } from '@/components/articleForm/schema';

const EditArticlePage = () => {
  const onSubmit: SubmitHandler<z.infer<typeof articleSchema>> = async (data) => {
    console.log('submit', data);
  };
  return (
    <div className="mx-auto flex min-h-screen px-4 pt-5 md:p-20">
      <main className="min-h-screen w-full">
        <div className="bg-background-primary mx-auto flex w-full flex-col gap-4 rounded-2xl px-5 py-10 md:px-10 md:py-14 lg:max-w-[900px]">
          <h1 className="mb-8 text-xl font-bold md:text-2xl">게시글 수정</h1>
          <ArticleEditor
            mode="edit"
            onSubmit={onSubmit}
            defaultValues={{
              title: '',
              content: '',
              image: null,
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
