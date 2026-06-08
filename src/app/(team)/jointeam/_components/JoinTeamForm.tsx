'use client';

import { useState } from 'react';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

interface JoinTeamFormProps {
  onSuccess?: () => void;
}

const JoinTeamForm = ({ onSuccess }: JoinTeamFormProps) => {
  const [teamLink, setTeamLink] = useState<string>('');
  const [teamLinkError, setTeamLinkError] = useState<string | null>(null);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamLink(e.target.value);
    if (teamLinkError) {
      setTeamLinkError(null);
    }
  };

  const handleLinkBlur = () => {
    if (!teamLink.trim()) {
      setTeamLinkError('팀 링크를 입력해주세요.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamLink.trim()) {
      setTeamLinkError('팀 링크를 입력해주세요.');
      return;
    }

    console.log('서버로 보낼 팀 참여 링크:', { link: teamLink });
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] md:max-w-[460px]">
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
              value={teamLink}
              placeholder="팀 링크를 입력해주세요."
              onChange={handleLinkChange}
              isError={Boolean(teamLinkError)}
              errorMessage={teamLinkError ?? undefined}
              onBlur={handleLinkBlur}
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
