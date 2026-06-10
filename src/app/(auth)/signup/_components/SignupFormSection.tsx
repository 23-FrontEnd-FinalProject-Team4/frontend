'use client';

import { useForm } from 'react-hook-form';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignupFormSection = () => {
  const signupForm = useForm<SignupFormValues>();
  const errors = signupForm.formState.errors;

  const onSubmit = (data: SignupFormValues) => {
    console.log(data); //TODO: 콘솔 삭제
  };
  return (
    <form onSubmit={signupForm.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <FormField
        id="signup-name"
        label="이름"
        placeholder="이름을 입력해주세요."
        isError={!!errors.name}
        errorMessage={errors.name?.message}
        {...signupForm.register('name', {
          required: '이름을 입력해주세요.',
        })}
      />
      <FormField
        id="signup-email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        isError={!!errors.email}
        errorMessage={errors.email?.message}
        {...signupForm.register('email', {
          required: '이메일을 입력해주세요.',
        })}
      />

      <FormField
        id="signup-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...signupForm.register('password', {
          required: '비밀번호를 입력해주세요.',
        })}
      />
      <FormField
        id="signup-confirm-password"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        isError={!!errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
        {...signupForm.register('passwordConfirmation', {
          required: '비밀번호를 다시 한 번 입력해주세요.',
          validate: (value) =>
            value === signupForm.getValues('password') || '비밀번호가 일치하지 않습니다.',
        })}
      />
      <Button type="submit" className="my-4">
        회원가입
      </Button>
    </form>
  );
};

export default SignupFormSection;
