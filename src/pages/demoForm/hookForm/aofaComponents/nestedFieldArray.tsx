import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { StyledInput, StyledNormalButton } from '@/pages/demoForm/hookForm/cases/styled';

export default ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test.${nestIndex}.nestedArray`,
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <StyledInput
              {...register(`test.${nestIndex}.nestedArray.${k}.field1`, {
                required: true,
              })}
              style={{ marginRight: '25px' }}
            />

            <StyledInput {...register(`test.${nestIndex}.nestedArray.${k}.field2`)} />
            <StyledNormalButton onClick={() => remove(k)}>Delete Nested</StyledNormalButton>
          </div>
        );
      })}

      <StyledNormalButton
        onClick={() =>
          append({
            field1: 'field1',
            field2: 'field2',
          })
        }
      >
        Append Nested
      </StyledNormalButton>

      <hr />
    </div>
  );
};
