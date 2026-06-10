'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import Button from '@/components/button/Button';
import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import Input from '@/components/input/Input';

const EditTeamForm = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const [imagePreview, setImagePreview] = useState<string>('/profile.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [teamName, setTeamName] = useState<string>('경영관리');
  const [teamNameError, setTeamNameError] = useState<string | null>(null);

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

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    if (teamNameError) {
      setTeamNameError(null);
    }
  };

  const handleTeamNameBlur = () => {
    if (!teamName.trim()) {
      setTeamNameError('팀 이름을 입력해주세요.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      setTeamNameError('팀 이름을 입력해주세요.');
      return;
    }

    if (teamName.trim() === '이미존재하는다른팀이름') {
      setTeamNameError('이미 존재하는 이름입니다.');
      return;
    }

    const requestBody = {
      name: teamName,
      image: imagePreview,
    };

    console.log(`PATCH 요청 보낼 주소: /${teamId}/groups/{id}`);
    console.log('서버로 보낼 데이터(Body):', requestBody);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <Input
              type="text"
              size="sm"
              value={teamName}
              placeholder="팀 이름을 입력해주세요."
              onChange={handleTeamNameChange}
              isError={Boolean(teamNameError)}
              errorMessage={teamNameError ?? undefined}
              onBlur={handleTeamNameBlur}
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
