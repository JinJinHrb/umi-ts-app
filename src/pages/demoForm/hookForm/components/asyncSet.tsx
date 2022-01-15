import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyledLabel, StyledH1, StyledInput } from './styled';

export default function App() {
  const { register, handleSubmit, reset } = useForm();
  const onSumbit = (data: object) => {
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        firstName: 'bill',
        lastName: 'luo',
      });
    }, 2000);
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSumbit)}>
      <StyledH1>Async Set Form Values</StyledH1>
      <StyledLabel>First name</StyledLabel>
      <input {...register('firstName')} />

      <StyledLabel>Last name</StyledLabel>
      <input {...register('lastName')} />
      {/* <input type="submit" /> */}
      <StyledInput />
    </form>
  );
}
