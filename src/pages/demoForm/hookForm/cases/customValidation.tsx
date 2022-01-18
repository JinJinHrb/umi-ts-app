import React from 'react';
import { useForm } from 'react-hook-form';
import { StyledErrorP, StyledLabel, StyledInput, StyledSubmitInput } from '@/pages/demoForm/hookForm/cases/styled';

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };
  const intialValues = {
    firstName: 'bill',
    lastName: 'luo',
    email: 'bluebill1049@hotmail.com',
    age: -1,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel htmlFor="firstName">First Name</StyledLabel>
      <StyledInput
        defaultValue={intialValues.firstName}
        placeholder="bill"
        {...register('firstName', {
          validate: (value) => value !== 'bill',
        })}
      />
      {errors.firstName && <StyledErrorP>Your name is not bill</StyledErrorP>}

      <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
      <StyledInput
        defaultValue={intialValues.lastName}
        placeholder="luo"
        {...register('lastName', {
          validate: (value) => value.length > 3,
        })}
      />
      {errors.lastName && <StyledErrorP>Your last name is less than 3 characters</StyledErrorP>}

      <StyledLabel htmlFor="email">Email</StyledLabel>
      <StyledInput
        defaultValue={intialValues.email}
        placeholder="bluebill1049@hotmail.com"
        type="email"
        {...register('email')}
      />
      <StyledLabel htmlFor="age">Age</StyledLabel>
      <StyledInput
        defaultValue={intialValues.age}
        placeholder="0"
        type="text"
        {...register('age', {
          validate: {
            positiveNumber: (value) => parseFloat(value) > 0,
            lessThanHundred: (value) => parseFloat(value) < 200,
          },
        })}
      />
      {errors.age && errors.age.type === 'positiveNumber' && <StyledErrorP>Your age is invalid</StyledErrorP>}
      {errors.age && errors.age.type === 'lessThanHundred' && (
        <StyledErrorP>Your age should be greater than 200</StyledErrorP>
      )}

      <StyledSubmitInput />
    </form>
  );
}
