'use client';
import { useRef, useState } from 'react';

import CalendarDate from '@/components/calendar/date/CalendarDate';
import CalendarTime from '@/components/calendar/time/CalendarTime';
import DropdownMd from '@/components/dropdown/DropdownMd';
import Input from '@/components/input/Input';
import InputBox from '@/components/inputBox/InputBox';
import Modal from '@/components/modal/Modal';
import { FREQUENCY_TEXT } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { TimeState } from '@/types/time';
import { formatISODate } from '@/utils/date';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<TimeState>({ hour: 0, minute: 0 });
  const [focusedInput, setFocusedInput] = useState<'date' | 'time' | null>(null);
  const [note, setNote] = useState('');

  const options = [
    FREQUENCY_TEXT.ONCE,
    FREQUENCY_TEXT.DAILY,
    FREQUENCY_TEXT.WEEKLY,
    FREQUENCY_TEXT.MONTHLY,
  ];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const formattedTime = `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')}`;

  const focusRef = useRef(null);
  useOutsideClick(focusRef, () => setFocusedInput(null));

  // TODO: Action 연결
  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 만들기"
      description="할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      primaryAction={{ label: '생성하기', onClick: handleSubmit }}
      size="lg"
      closeOnOverlayClick
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="task-title" className="text-text-primary text-lg font-medium">
            할 일 제목
            <span className="text-status-danger ml-1">*</span>
          </label>
          <Input
            id="task-title"
            name="task-title"
            type="text"
            placeholder="할 일 제목을 입력해 주세요"
            className="min-w-0"
            required
          />
        </div>
        <div className="flex flex-col gap-4" ref={focusRef}>
          <label htmlFor="task-start-date" className="text-text-primary text-lg font-medium">
            시작 날짜 및 시간
            <span className="text-status-danger ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              id="task-start-date"
              name="task-start-date"
              type="text"
              value={formatISODate(selectedDate)}
              placeholder="YYYY년 MM월 DD일"
              onClick={() => setFocusedInput('date')}
              readOnly
            />
            <Input
              id="task-start-time"
              name="task-start-time"
              type="text"
              value={formattedTime}
              placeholder="0:00"
              onClick={() => setFocusedInput('time')}
              readOnly
            />
          </div>
          {focusedInput === 'date' && (
            <CalendarDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          )}
          {focusedInput === 'time' && (
            <CalendarTime selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-text-primary text-lg font-medium">반복 설정</label>
          <DropdownMd options={options} onSelect={setSelectedOption}>
            {selectedOption}
          </DropdownMd>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="task-note" className="text-text-primary text-lg font-medium">
            할 일 메모
          </label>
          <InputBox
            id="task-note"
            name="task-note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            placeholder="할 일에 대한 메모를 남겨주세요"
            className="min-w-0"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
