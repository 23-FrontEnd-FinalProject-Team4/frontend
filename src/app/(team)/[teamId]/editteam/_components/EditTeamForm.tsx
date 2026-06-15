'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/button/Button';
import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import Input from '@/components/input/Input';

interface EditTeamFormValues {
  teamName: string;
}

const EditTeamForm = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const [imagePreview, setImagePreview] = useState<string>('/profile.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { control, handleSubmit, setError } = useForm<EditTeamFormValues>({
    defaultValues: {
      teamName: '경영관리',
    },

    mode: 'onBlur',
  });

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
    if (data.teamName.trim() === '이미존재하는다른팀이름') {
      toast.error('이미 존재하는 팀 이름입니다. 다른 이름을 입력해주세요.');
      setError('teamName', {
        type: 'validate',
        message: '이미 존재하는 이름입니다.',
      });
      return;
    }

    const requestBody = {
      name: data.teamName,
      image: imagePreview,
    };

    console.log(`PATCH 요청 보낼 주소: /${teamId}/groups/{id}`);
    console.log('서버로 보낼 데이터(Body):', requestBody);

    toast.success('팀 정보가 성공적으로 수정되었습니다! 🎉');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8 md:gap-10">
        <span className="text-text-primary text-xl font-bold md:text-2xl">팀 수정하기</span>

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
                  isError={Boolean(error)}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Button type="submit">수정하기</Button>
          <p className="text-text-default flex justify-center text-xs break-all md:text-lg">
            팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
          </p>
        </div>
      </div>
    </form>
  );
};

export default EditTeamForm;
