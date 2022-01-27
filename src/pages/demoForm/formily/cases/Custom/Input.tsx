import React from 'react';
import { Field } from '@formily/core';

// Input UI组件
export default (inProps: Field) => {
  const props = inProps as any;
  return (
    <input
      {...props}
      value={props.value || ''}
      style={{
        border: '2px solid rgb(186 203 255)',
        borderRadius: 6,
        width: '100%',
        height: 28,
        padding: '0 5px',
      }}
    />
  );
};
