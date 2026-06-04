'use client';

import Image from 'next/image';

import BestIcon from '@/assets/icons/best.svg?react';
import HeartEmptyIcon from '@/assets/icons/heart_empty.svg?react';
import HeartFillIcon from '@/assets/icons/heart_fill.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import SampleImage from '@/assets/images/sample.png';

import DropdownMd from '@/components/dropdown/DropdownMd';

import type { ArticlesPageProps } from './type';

export default function ArticlesPage({
  value,
  onChange,
  placeholder = '검색어를 입력해주세요.',
}: ArticlesPageProps) {
  return (
    <div className="bg-background-primary mx-auto flex h-screen lg:p-22">
      <main className="w-full">
        {/* 자유게시판 헤더 */}
        <div className="mb-7 flex flex-col gap-4 px-6 md:flex-row md:justify-between lg:px-0">
          <h1 className="text-text-primary text-2xl font-bold">자유게시판</h1>
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2" />
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="border-brand-primary h-14 w-105 rounded-full border-2 px-14 outline-none"
            />
          </div>
        </div>
        {/* 베스트 게시글  */}
        <div className="bg-background-secondary mb-10 flex w-full flex-col items-center gap-6 rounded-2xl px-6 py-10">
          <h1 className="text-text-primary text-xl font-bold">베스트 게시글</h1>
          <div className="grid grid-cols-3 gap-3">
            <div className="border-border-primary bg-background-primary flex flex-col gap-4 rounded-2xl border px-6 py-4">
              <span className="bg-background-secondary text-brand-primary flex w-18 flex-row items-center justify-center gap-1 rounded-full py-1.5 text-[14px] font-bold">
                <BestIcon className="h-6 w-4" />
                인기
              </span>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="text-text-primary text-2lg--line-height-24 font-bold">
                      커피믹스 털이범 신고
                    </span>
                    <p className="text-text-disabled text-md--line-height-17 line-clamp-2 font-light">
                      어제 탕비실에 커피믹스 새로 다 채워놨는데 오늘 아침에 하나도 남김없이
                      사라졌습니다. 혹시 커피 믹스 괴도를 보신 분이 있으시면 알려주세요. 제보는
                      운영지원팀 김믹스로 부탁드립니다.
                    </p>
                  </div>
                  <Image
                    src={SampleImage}
                    alt="thumbnail"
                    width={60}
                    height={60}
                    className="h-15 w-15 rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary text-md">김믹스</span>

                    <div className="bg-text-default h-3 w-px" />
                    <span className="text-text-disabled text-md">2026. 06. 04</span>
                  </div>
                  <span className="text-text-disabled text-md flex flex-row items-center gap-1 font-light">
                    <HeartEmptyIcon className="h-6 w-4" /> 999+
                  </span>
                </div>
              </div>
            </div>
            <div className="border-border-primary bg-background-primary rounded-2xl border px-6 py-4">
              커피믹스 털이범 신고
            </div>
            <div className="border-border-primary bg-background-primary rounded-2xl border px-6 py-4">
              커피믹스 털이범 신고
            </div>
          </div>
        </div>
        {/* 전체 게시글 */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <h1 className="text-text-primary text-2xl font-bold">전체</h1>
            <DropdownMd options={['최신순', '좋아요 많은순']}>
              <div>전체</div>
            </DropdownMd>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="border-border-primary bg-background-primary flex flex-col gap-4 rounded-2xl border px-6 py-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="text-text-primary text-2lg--line-height-24 font-bold">
                      커피믹스 털이범 신고
                    </span>
                    <p className="text-text-disabled text-md--line-height-17 line-clamp-2 font-light">
                      어제 탕비실에 커피믹스 새로 다 채워놨는데 오늘 아침에 하나도 남김없이
                      사라졌습니다. 혹시 커피 믹스 괴도를 보신 분이 있으시면 알려주세요. 제보는
                      운영지원팀 김믹스로 부탁드립니다.
                    </p>
                  </div>
                  <Image
                    src={SampleImage}
                    alt="thumbnail"
                    width={60}
                    height={60}
                    className="h-15 w-15 rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary text-md">김믹스</span>

                    <div className="bg-text-default h-3 w-px" />
                    <span className="text-text-disabled text-md">2026. 06. 04</span>
                  </div>
                  <span className="text-text-disabled text-md flex flex-row items-center gap-1 font-light">
                    <HeartEmptyIcon className="h-6 w-4" /> 999+
                  </span>
                </div>
              </div>
            </div>
            <div className="border-border-primary rounded-2xl border px-6 py-4">
              커피머신 고장 신고
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
