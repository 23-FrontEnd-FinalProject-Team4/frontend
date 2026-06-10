'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/button/Button';
import FormField from '@/components/formField/FormField';

import { type SignupFormValues, signupSchema } from '../_schemas/signup.schema';

const SignupFormSection = () => {
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  const errors = signupForm.formState.errors;

  const onSubmit = (data: SignupFormValues) => {
    console.log(data); //TODO: 콘솔 삭제
  };
  return (
    <form onSubmit={signupForm.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <FormField
        id="signup-nickname"
        label="이름"
        placeholder="이름을 입력해주세요."
        isError={!!errors.nickname}
        errorMessage={errors.nickname?.message}
        {...signupForm.register('nickname')}
      />
      <FormField
        id="signup-email"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        isError={!!errors.email}
        errorMessage={errors.email?.message}
        {...signupForm.register('email')}
      />

      <FormField
        id="signup-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        isError={!!errors.password}
        errorMessage={errors.password?.message}
        {...signupForm.register('password')}
      />
      <FormField
        id="signup-password-confirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        isError={!!errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
        {...signupForm.register('passwordConfirmation')}
      />
      <Button type="submit" className="my-4">
        회원가입
      </Button>
    </form>
  );
};

export default SignupFormSection;
