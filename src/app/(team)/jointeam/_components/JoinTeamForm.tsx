'use client';

import { useForm } from 'react-hook-form';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

interface JoinTeamFormProps {
  onSuccess?: () => void;
}

interface JoinTeamFormData {
  teamLink: string;
}

const JoinTeamForm = ({ onSuccess }: JoinTeamFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinTeamFormData>({
    defaultValues: {
      teamLink: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: JoinTeamFormData) => {
    console.log('서버로 보낼 팀 참여 링크:', { link: data.teamLink });
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] md:max-w-[460px]">
      <div className="flex flex-col gap-8 md:gap-10">
        <h1 className="text-text-primary text-xl font-bold md:text-2xl">팀 참여하기</h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 md:gap-3">
            <label htmlFor="teamLink" className="text-md text-text-primary font-medium">
              팀 링크
            </label>
            <Input
              id="teamLink"
              type="text"
              size="sm"
              placeholder="팀 링크를 입력해주세요."
              isError={Boolean(errors.teamLink)}
              errorMessage={errors.teamLink?.message}
              {...register('teamLink', {
                required: '팀 링크를 입력해주세요.',
                validate: (value) => value.trim() !== '' || '팀 링크를 입력해주세요.',
              })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Button
            type="submit"
            className="bg-brand-primary hover:bg-interaction-hover active:bg-interaction-pressed w-full rounded-xl py-3 font-semibold text-white transition-colors"
          >
            참여하기
          </Button>

          <p className="text-text-default flex justify-center text-lg break-all">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </div>
      </div>
    </form>
  );
};

export default JoinTeamForm;
