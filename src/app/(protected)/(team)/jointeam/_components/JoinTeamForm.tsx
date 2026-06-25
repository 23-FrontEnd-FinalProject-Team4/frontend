'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  JOIN_TEAM_ERROR_CODE,
  JoinTeamError,
} from '@/app/(protected)/(team)/jointeam/join-team.error';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { getErrorMessage } from '@/lib/error';
import { useJoinTeamMutation } from '@/queries/teams/queries';

interface JoinTeamFormProps {
  initialTeamLink?: string;
  onSuccess?: () => void;
}

interface JoinTeamFormData {
  teamLink: string;
}

const JoinTeamForm = ({ initialTeamLink = '', onSuccess }: JoinTeamFormProps) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useJoinTeamMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<JoinTeamFormData>({
    defaultValues: {
      teamLink: initialTeamLink,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: JoinTeamFormData) => {
    if (isPending) return;

    try {
      const { groupId } = await mutateAsync({
        teamLink: data.teamLink.trim(),
      });

      toast.success('팀에 성공적으로 참여했습니다!');
      onSuccess?.();
      router.push(`/${groupId}`);
    } catch (error) {
      if (
        error instanceof JoinTeamError &&
        (error.code === JOIN_TEAM_ERROR_CODE.INVALID_LINK ||
          error.code === JOIN_TEAM_ERROR_CODE.VALIDATION)
      ) {
        setError('teamLink', {
          type: 'validate',
          message: error.message,
        });
        return;
      }

      toast.error(getErrorMessage(error, '팀 참여 중 오류가 발생했어요.'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] md:max-w-[460px]">
      <div className="flex flex-col gap-8 md:gap-10">
        <h1 className="text-text-primary text-xl font-semibold md:text-2xl">팀 참여하기</h1>

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
              disabled={isPending}
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
            disabled={isPending}
            className="bg-brand-primary hover:bg-interaction-hover active:bg-interaction-pressed w-full rounded-xl py-3 font-semibold text-white transition-colors"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  role="status"
                />
                <span className="sr-only">처리 중...</span>
              </span>
            ) : (
              '참여하기'
            )}
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
