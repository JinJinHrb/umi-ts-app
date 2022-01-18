import React from 'react';
import { useFieldArray } from 'react-hook-form';
import NestedArray from './nestedFieldArray';
import { StyledInput, StyledCounterSpan, StyledNormalButton } from '@/pages/demoForm/hookForm/cases/styled';
import { StyledSection, StyledUl, StyledLi, StyledRowFlexWrapper, StyledSpace } from './styled';
import { IFieldArray } from './types.d';

let renderCount = 0;

export default function Fields(props: any) {
  const { control, register, setValue, getValues }: IFieldArray = props;
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test',
  });

  renderCount++;

  return (
    <>
      <StyledUl>
        {fields.map((item, index) => {
          return (
            <StyledLi key={item.id}>
              <StyledInput {...register(`test.${index}.name`)} />

              <StyledNormalButton onClick={() => remove(index)}>Delete</StyledNormalButton>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </StyledLi>
          );
        })}
      </StyledUl>

      <StyledSection>
        <StyledRowFlexWrapper>
          <StyledNormalButton
            onClick={() => {
              append({ name: 'append' });
            }}
          >
            append
          </StyledNormalButton>
          <StyledSpace />
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
          <StyledSpace />
          <StyledNormalButton
            onClick={() => {
              prepend({ name: 'append' });
            }}
          >
            prepend
          </StyledNormalButton>
          <StyledSpace />
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
        </StyledRowFlexWrapper>
      </StyledSection>

      <StyledCounterSpan>Render Count: {renderCount}</StyledCounterSpan>
    </>
  );
}
