'use client';

import Link from 'next/link';

import KakaoIcon from '@/assets/images/kakaotalk.svg';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <main className="bg-background-primary flex h-[720px] w-[550px] flex-col rounded-2xl p-18">
        <h1 className="mb-12 text-center text-xl font-semibold">로그인</h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">이메일</label>
            <Input id="email" placeholder="이메일을 입력해주세요." />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password">비밀번호</label>
            <Input id="password" type="password" placeholder="비밀번호를 입력해주세요." />
          </div>

          <button
            type="button"
            className="text-md mb-4 text-right text-[#5189FA] underline"
            onClick={() => {}}
          >
            비밀번호를 잊으셨나요?
          </button>

          <Button>로그인</Button>
        </form>

        <div className="text-md m-7 flex justify-center gap-2">
          <span>아직 계정이 없으신가요?</span>
          <Link href="/" className="text-[#5189FA] !underline">
            가입하기
          </Link>
        </div>

        <div className="mb-4 flex items-center gap-8">
          <div className="bg-border-primary h-px flex-1" />
          <span className="text-text-default text-md font-light">OR</span>
          <div className="bg-border-primary h-px flex-1" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-md text-text-default">간편 로그인하기</span>
          <KakaoIcon />
        </div>
      </main>
    </div>
  );
}
