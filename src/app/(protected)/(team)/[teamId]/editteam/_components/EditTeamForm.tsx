'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/button/Button';
import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import Input from '@/components/input/Input';
import { getErrorMessage } from '@/lib/error';
import { UpdateTeamMutationError, useUpdateTeamMutation } from '@/queries/teams/queries';

const DEFAULT_IMAGE_PREVIEW = '/profile.svg';

interface EditTeamFormProps {
  groupId: number;
  initialName: string;
  initialImageUrl: string | null;
}

interface EditTeamFormValues {
  teamName: string;
}

const EditTeamForm = ({ groupId, initialName, initialImageUrl }: EditTeamFormProps) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateTeamMutation();

  const [imagePreview, setImagePreview] = useState<string>(
    initialImageUrl ?? DEFAULT_IMAGE_PREVIEW,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { control, handleSubmit, setError } = useForm<EditTeamFormValues>({
    defaultValues: {
      teamName: initialName,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);

    setImagePreview((prev) => {
      if (prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return previewUrl;
    });
  };

  const onSubmit = async (data: EditTeamFormValues) => {
    if (isPending) return;

    try {
      await mutateAsync({
        groupId,
        name: data.teamName.trim(),
        imageFile,
        currentImage: initialImageUrl,
      });

      toast.success('팀 정보가 성공적으로 수정되었습니다!');
      router.push(`/${groupId}`);
    } catch (error) {
      if (error instanceof UpdateTeamMutationError && error.isDuplicateName) {
        setError('teamName', {
          type: 'validate',
          message: '이미 존재하는 이름입니다.',
        });
        return;
      }

      toast.error(getErrorMessage(error, '팀 정보 수정 중 오류가 발생했어요.'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8 md:gap-10">
        <span className="text-text-primary text-xl font-semibold md:text-2xl">팀 수정하기</span>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <EditableProfileImage
              src={imagePreview}
              alt="팀 프로필 이미지"
              onChange={handleImageChange}
            />
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
              <span className="flex items-center justify-center gap-2">
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  role="status"
                />
                <span className="sr-only">처리 중...</span>
              </span>
            ) : (
              '수정하기'
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

export default EditTeamForm;
