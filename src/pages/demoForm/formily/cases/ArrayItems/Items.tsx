import { ArrayField, Field } from '@formily/core';
import { RecursionField, useField, useFieldSchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import React from 'react';
import { ReactElement } from 'react';

type PropsType = Field & {
  children: (index: number) => ReactElement;
};
export default observer((props: PropsType) => {
  const field = useField<ArrayField>();
  const fieldSchema = useFieldSchema();
  const buttonStyle = {
    border: '1px solid #ccc',
    borderRadius: '2px',
    background: 'grey',
    marginTop: '15px',
    lineHeight: '1.1rem',
    cursor: 'pointer',
  };
  return (
    <div
      style={{
        border: '2px solid rgb(186 203 255)',
      }}
    >
      <div style={{ padding: '10px 0 0 10px' }}>
        {field.value?.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <RecursionField name={index} schema={fieldSchema!.items} />
              </div>
              <button
                style={buttonStyle}
                onClick={() => {
                  field.remove(index);
                }}
              >
                删除
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '0 0 10px 10px' }}>
        <button
          style={buttonStyle}
          onClick={() => {
            field.push({});
          }}
        >
          添加一行
        </button>
      </div>
    </div>
  );
});
