import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledLabel, StyledH1, StyledSubmitInput, StyleInvalidSubmitButton } from './styled';
import _ from 'lodash';
import { sleep } from '@/utils';

interface ISubmitData {
  username?: string;
  password?: string;
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const [uploading, setUploading] = useState(false);

  // 处理错误 Start

  const [usernameError, setUsernameError] = useState<object | undefined>();
  const [lastNameError, setLastNameError] = useState<object | undefined>();
  const [emailError, setEmailError] = useState<object | undefined>();

  useEffect(() => {
    // console.log('asyncSubmitValidation #28 errors:', errors);
    if (errors?.username) {
      setUsernameError(errors.username);
    } else {
      setUsernameError(undefined);
    }
    if (errors?.lastName) {
      setLastNameError(errors.lastName);
    } else {
      setLastNameError(undefined);
    }
    if (errors?.email) {
      setEmailError(errors.email);
    } else {
      setEmailError(undefined);
    }
  }, [errors, uploading]);

  // 处理错误 End

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
      <StyledH1>Async Field Validation</StyledH1>
      <StyledLabel htmlFor="username">User Name</StyledLabel>
      <input
        placeholder="Bill"
        {...register('username', {
          validate: async (value) => {
            setUploading(true);
            await sleep(1000);
            setUploading(false);
            return value === 'bill';
          },
        })}
      />
      <div style={{ color: 'red' }}>{usernameError && 'There are errors, check your console.'}</div>

      <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
      <input placeholder="Luo" {...register('lastName')} />
      <div style={{ color: 'red' }}>{lastNameError && 'There are errors, check your console.'}</div>

      <StyledLabel htmlFor="email">Email</StyledLabel>
      <input placeholder="bluebill1049@hotmail.com" type="text" {...register('email')} />
      <div style={{ color: 'red' }}>{emailError && 'There are errors, check your console.'}</div>

      {!uploading ? <StyledSubmitInput /> : <StyleInvalidSubmitButton>提交</StyleInvalidSubmitButton>}
    </form>
  );
}
