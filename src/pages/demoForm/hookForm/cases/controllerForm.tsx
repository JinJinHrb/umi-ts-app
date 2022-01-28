import * as React from 'react';
import { useForm, useController, UseControllerProps } from 'react-hook-form';
import Headers from './hfComponents/Header';
import { StyledP } from '@/pages/demoForm/hookForm/cases/styled';

type FormValues = {
  FirstName: string;
};

let renderCount = 0;

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <StyledP>{fieldState.isTouched && 'Touched'}</StyledP>
      <StyledP>{fieldState.isDirty && 'Dirty'}</StyledP>
      <StyledP>{fieldState.invalid ? 'invalid' : 'valid'}</StyledP>
    </div>
  );
}

export default function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: '',
    },
    mode: 'onChange',
  });
  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <div>
      <Headers
        renderCount={++renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} name="FirstName" rules={{ required: true }} />
        <input type="submit" />
      </form>
    </div>
  );
}
