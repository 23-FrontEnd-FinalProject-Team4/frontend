export type EditableProfileImageSize = 'sm' | 'lg';

export interface EditableProfileImageProps {
  src: string;
  alt?: string;
  size?: EditableProfileImageSize;
  onChange?: (file: File) => void;
}
