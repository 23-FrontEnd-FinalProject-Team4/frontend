'use client';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

const SignupFormSection = () => {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-name">이름</label>
          <Input id="signup-name" placeholder="이름을 입력해주세요." />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-email">이메일</label>
          <Input id="signup-email" placeholder="이메일을 입력해주세요." />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-password">비밀번호</label>
          <Input id="signup-password" type="password" placeholder="비밀번호를 입력해주세요." />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-confirm-password">비밀번호 확인</label>
          <Input
            id="signup-confirm-password"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
          />
        </div>

        <Button className="my-4">회원가입</Button>
      </form>
    </>
  );
};

export default SignupFormSection;
