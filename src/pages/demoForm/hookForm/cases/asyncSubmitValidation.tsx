import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledLabel, StyledH1, StyledSubmitInput } from './styled';

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
  const [uploading, setUploading] = useState(false);
  const onSubmit = async (data: ISubmitData) => {
    if (uploading) {
      return;
    }
    setUploading(true);
    await sleep(2000);
    setUploading(false);
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
      <StyledSubmitInput uploading={uploading} />
    </form>
  );
}
