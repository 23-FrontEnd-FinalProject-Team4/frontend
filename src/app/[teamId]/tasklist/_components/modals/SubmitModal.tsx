import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import Modal from '@/components/modal/Modal';

interface SubmitModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initValue?: string;
  onSubmit: () => void;
}
const SubmitModal = ({ title, isOpen, onClose, initValue }: SubmitModalProps) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
      <Input defaultValue={initValue} />
      <Button variant="primary-filled">만들기</Button>
    </Modal>
  );
};

export default SubmitModal;
