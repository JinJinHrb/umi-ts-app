import React from 'react';
import { observer } from '@formily/reactive-react';
import { IFieldFeedback } from '@formily/core';
import { FieldContext } from './Context';
import { useContext } from 'react';
import _ from 'lodash';
import { umiConsole } from '@/utils';

// FormItem UI组件
export default observer(({ children }) => {
  const field = useContext(FieldContext);
  const decoratorProps = field.decoratorProps as any;
  let style = {};
  if (decoratorProps.style) {
    style = decoratorProps.style;
  }

  /* 
    address: "name"
    code: "ValidateError"
    messages: Array(1)
    0: "The field value is required"
    length: 1
    lastIndex: (...)
    lastItem: (...)
    [[Prototype]]: Array(0)
    path: "name"
    triggerType: "onInput"
    type: "error" 
    */
  const errors = field.errors as IFieldFeedback[];
  const messages = errors.filter((error) => _.includes(error?.code, 'Error')).map((error) => error?.messages);

  return (
    <div>
      <div style={{ height: 20, ...style }}>{field.title}:</div>
      {children}
      <div style={{ height: 20, fontSize: 12, color: 'red' }}>
        {_.isArray(messages) && !_.isEmpty(messages) ? messages?.join(',') : undefined}
      </div>
    </div>
  );
});
