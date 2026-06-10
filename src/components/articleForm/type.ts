import { FieldErrors, UseFormRegister } from 'react-hook-form';

export type ArticleFormValues = {
  title: string;
  content: string;
};

export type ArticleFormProps = {
  register: UseFormRegister<ArticleFormValues>;
  errors: FieldErrors<ArticleFormValues>;

  image: File | null;
  submitText: string;

  onImageChange: (file: File | null) => void;
};
