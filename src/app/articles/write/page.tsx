'use client';

import { useState } from 'react';

import Link from 'next/link';

import UploadIcon from '@/assets/icons/img.svg';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import InputBox from '@/components/inputBox/InputBox';

const WriteArticlePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="mx-auto flex min-h-screen px-4 pt-5 md:p-22">
      <main className="min-h-screen w-full">
        <div className="bg-background-primary mx-auto flex w-full flex-col gap-4 rounded-2xl px-5 py-10 md:px-10 md:py-14 lg:max-w-[900px]">
          <h1 className="mb-8 text-xl font-bold md:text-2xl">게시글 쓰기</h1>
          <div className="mb-8 flex flex-col gap-2">
            <div className="flex gap-1">
              <span className="text-md flex gap-1 font-bold md:text-lg">제목</span>
              <span className="text-point-rose">*</span>
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
              size="lg"
            />
          </div>

          <div className="mb-8 flex flex-col gap-2">
            <div className="flex gap-1">
              <span className="text-md flex gap-1 font-bold md:text-lg">내용</span>
              <span className="text-point-rose">*</span>
            </div>
            <InputBox
              size="lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요."
              maxLength={1000}
            />
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <span className="text-md flex gap-1 font-bold md:text-lg">이미지</span>
            <button
              type="button"
              className="border-border-primary flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border"
            >
              <UploadIcon className="size-6" />
              <span className="text-text-disabled text-md">0 / 1</span>
            </button>
          </div>
          <Button variant="primary-filled" className="w-full" onClick={() => {}}>
            등록
          </Button>
        </div>
        <div className="flex w-full justify-center pt-8">
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

export default WriteArticlePage;
