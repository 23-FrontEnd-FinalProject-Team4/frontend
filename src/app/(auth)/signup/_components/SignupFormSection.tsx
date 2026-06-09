'use client';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';

const SignupFormSection = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="flex flex-col gap-5"
    >
      <FormField id="signup-name" label="이름" placeholder="이름을 입력해주세요." />
      <FormField id="signup-email" label="이메일" placeholder="이메일을 입력해주세요." />

      <FormField
        id="signup-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <FormField
        id="signup-confirm-password"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
      />
      <Button className="my-4">회원가입</Button>
    </form>
  );
};

export default SignupFormSection;
