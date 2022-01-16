import React from 'react';
import { useForm } from 'react-hook-form';
import FieldArray from '@/pages/demoForm/hookForm/cases/aofaComponents/fieldArray';
import { StyledH1, StyledP, StyledNormalButton, StyledSubmitInput } from '@/pages/demoForm/hookForm/cases/styled';
import { StyledFlexWrapper } from '@/pages/demoForm/hookForm/cases/aofaComponents/styled';

const defaultValues = {
  test: [
    {
      name: 'useFieldArray1',
      nestedArray: [{ field1: 'field1', field2: 'field2' }],
    },
    {
      name: 'useFieldArray2',
      nestedArray: [{ field1: 'field1', field2: 'field2' }],
    },
  ],
};

export default function App() {
  const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => console.log('data', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledH1>Array of Array Fields</StyledH1>
      <StyledP>The following example demonstrate the ability of building nested array fields.</StyledP>

      <StyledFlexWrapper>
        <FieldArray {...{ control, register, defaultValues, getValues, setValue, errors }} />
      </StyledFlexWrapper>

      <StyledNormalButton onClick={() => reset(defaultValues)}>Reset</StyledNormalButton>

      <StyledSubmitInput />
    </form>
  );
}
