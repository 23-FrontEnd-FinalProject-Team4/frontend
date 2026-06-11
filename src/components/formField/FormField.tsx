import type { ComponentProps } from 'react';

import Input from '@/components/input/Input';

interface FormFieldProps extends Omit<ComponentProps<typeof Input>, 'id'> {
  id: string;
  label: string;
}

const FormField = ({ id, label, ...inputProps }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id}>{label}</label>
      <Input id={id} {...inputProps} />
    </div>
  );
};

export default FormField;
