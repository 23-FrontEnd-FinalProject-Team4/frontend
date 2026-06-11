'use client';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';

const handleForgotPasswordClick = () => {};

const LoginFormSection = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="flex flex-col gap-4"
    >
      <FormField id="login-email" label="이메일" placeholder="이메일을 입력해주세요." />
      <FormField
        id="login-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <button
        type="button"
        className="text-md text-brand-primary mb-4 text-right underline"
        onClick={handleForgotPasswordClick}
      >
        비밀번호를 잊으셨나요?
      </button>
      <Button>로그인</Button>
    </form>
  );
};

export default LoginFormSection;
