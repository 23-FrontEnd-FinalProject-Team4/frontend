'use client';

import Link from 'next/link';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

export default function LoginFormSection() {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
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
          className="text-md text-brand-primary mb-4 text-right underline"
          onClick={() => {}}
        >
          비밀번호를 잊으셨나요?
        </button>

        <Button>로그인</Button>
      </form>

      <div className="text-md m-7 flex justify-center gap-2">
        <span>아직 계정이 없으신가요?</span>

        <Link href="/signup" className="text-brand-primary !underline">
          가입하기
        </Link>
      </div>
    </>
  );
}
