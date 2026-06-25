'use client';

import Link from 'next/link';

import LogoIcon from '@/assets/icons/logo_coworkers.svg?react';

const ErrorPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 md:min-h-screen">
      <div className="flex w-full max-w-120 flex-col items-center text-center">
        <LogoIcon className="h-12 w-12 shrink-0 overflow-visible" aria-hidden="true" />

        <strong className="text-brand-primary mt-10 text-7xl leading-none font-semibold md:text-8xl">
          500
        </strong>

        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-text-primary text-xl font-semibold md:text-2xl">
            서비스에 문제가 발생했습니다
          </h1>
          <p className="text-text-default text-sm leading-6 md:text-base">
            일시적인 오류가 발생했거나 서비스 점검 중일 수 있어요.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="bg-brand-primary text-background-primary hover:bg-interaction-hover active:bg-interaction-pressed mt-10 inline-flex h-12 min-w-40 items-center justify-center rounded-xl px-6 text-sm font-medium transition-colors md:text-base"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
