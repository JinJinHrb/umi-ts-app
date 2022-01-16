import React from 'react';
import { useFieldArray } from 'react-hook-form';
import NestedArray from './nestedFieldArray';
import { StyledInput, StyledCounterSpan, StyledNormalButton } from '@/pages/demoForm/hookForm/cases/styled';

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test',
  });

  renderCount++;

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <StyledInput {...register(`test.${index}.name`)} />

              <StyledNormalButton onClick={() => remove(index)}>Delete</StyledNormalButton>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <StyledNormalButton
          onClick={() => {
            append({ name: 'append' });
          }}
        >
          append
        </StyledNormalButton>

        <StyledNormalButton
          onClick={() => {
            setValue('test', [
              ...(getValues().test || []),
              {
                name: 'append',
                nestedArray: [{ field1: 'append', field2: 'append' }],
              },
            ]);
          }}
        >
          Append Nested
        </StyledNormalButton>

        <StyledNormalButton
          onClick={() => {
            prepend({ name: 'append' });
          }}
        >
          prepend
        </StyledNormalButton>

        <StyledNormalButton
          onClick={() => {
            setValue('test', [
              {
                name: 'append',
                nestedArray: [{ field1: 'Prepend', field2: 'Prepend' }],
              },
              ...(getValues().test || []),
            ]);
          }}
        >
          prepend Nested
        </StyledNormalButton>
      </section>

      <StyledCounterSpan>Render Count: {renderCount}</StyledCounterSpan>
    </>
  );
}
