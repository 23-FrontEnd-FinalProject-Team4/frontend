'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/button/Button';
import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import Input from '@/components/input/Input';
import { getErrorMessage, isDuplicateNameError } from '@/lib/error';
import { useCreateTeamMutation } from '@/queries/teams/queries';
import { useAddTeamStore } from '@/stores/addTeamStore';

interface AddTeamFormValues {
  teamName: string;
}

const AddTeamForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateTeamMutation();
  const { imagePreview, imageFile, setImage, reset } = useAddTeamStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const { control, handleSubmit, setError } = useForm<AddTeamFormValues>({
    defaultValues: {
      teamName: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: AddTeamFormValues) => {
    if (isPending) return;

    try {
      const createdGroup = await mutateAsync({
        name: data.teamName.trim(),
        imageFile,
      });

      reset();
      toast.success('새로운 팀이 성공적으로 생성되었습니다!');
      router.push(`/${createdGroup.id}`);
    } catch (error) {
      if (isDuplicateNameError(error)) {
        setError('teamName', {
          type: 'validate',
          message: '이미 존재하는 이름입니다.',
        });
        return;
      }

      toast.error(getErrorMessage(error, '팀 생성 중 오류가 발생했어요.'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8 md:gap-10">
        <span className="text-text-primary text-xl font-bold md:text-2xl">팀 생성하기</span>
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <EditableProfileImage src={imagePreview} alt="팀 프로필 이미지" onChange={setImage} />
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <label className="text-md text-text-primary font-medium">팀 이름</label>
            <Controller
              name="teamName"
              control={control}
              rules={{
                required: '팀 이름을 입력해주세요.',
                validate: (value) => value.trim() !== '' || '팀 이름을 입력해주세요.',
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  type="text"
                  size="sm"
                  placeholder="팀 이름을 입력해주세요."
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={isPending}
                  isError={Boolean(error)}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </span>
            ) : (
              '생성하기'
            )}
          </Button>
          <p className="text-text-default flex justify-center text-xs break-all md:text-lg">
            팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
          </p>
        </div>
      </div>
    </form>
  );
};

export default AddTeamForm;
