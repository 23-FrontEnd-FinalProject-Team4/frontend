import SearchIcon from '@/components/icons/search.svg?react';

import type { ArticlesPageProps } from './type';

export default function ArticlesPage({ value, onChange, placeholder }: ArticlesPageProps) {
  return (
    <div className="flex h-screen">
      <main className="">
        <div className="mx-auto p-8">
          <h1>자유게시판</h1>
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2" />

            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="border-brand-primary h-12 w-full rounded-full border pr-4 pl-12 outline-none"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
