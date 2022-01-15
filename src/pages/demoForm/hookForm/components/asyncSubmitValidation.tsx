import React from 'react';
import { useForm } from 'react-hook-form';
import { StyledLabel, StyledH1, StyledInput } from './styled';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ISubmitData {
  username?: string;
  password?: string;
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: ISubmitData) => {
    await sleep(2000);
    if (data.username === 'bill') {
      alert(JSON.stringify(data));
    } else {
      alert('There is an error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledH1>Async Submit Validation</StyledH1>
      <StyledLabel htmlFor="username">User Name</StyledLabel>
      <input placeholder="Bill" {...register('username')} />

      <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
      <input placeholder="Luo" {...register('lastName')} />

      <StyledLabel htmlFor="email">Email</StyledLabel>
      <input placeholder="bluebill1049@hotmail.com" type="text" {...register('email')} />

      <div style={{ color: 'red' }}>{Object.keys(errors).length > 0 && 'There are errors, check your console.'}</div>
      <StyledInput />
    </form>
  );
}
