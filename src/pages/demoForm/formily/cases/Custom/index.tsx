import React, { useMemo, useRef } from 'react';
import { FormProvider, MyField } from './Context';
import Input from './Input';
import InputDigit from './InputDigit';
import Password from './Password';
import Label from './Label';
import FormItem from './FormItem';
import { createForm, Field, onFieldReact } from '@formily/core';
// import { umiConsole } from '@/utils/utils';
import _ from 'lodash';

export default (props: any) => {
  const ref = useRef({ ageStyle: undefined });

  //   umiConsole.log('Top Render');
  const form = useMemo(() => {
    return createForm({
      effects: () => {
        onFieldReact('nameLength', (field) => {
          let field2 = field as Field;
          field2.value = field2.query('.name').value()?.length;
        });
      },
    });
  }, []);

  const ageStyleToggler = () => {
    form.getFieldState('age', (state: any) => {
      let decoratorProps = state?.decorator?.[1] as any;
      if (!ref.current.ageStyle) {
        ref.current.ageStyle = _.clone(decoratorProps.style);
        // umiConsole.log('age style:', decoratorProps.style);
      }
      const initHeight = (ref.current.ageStyle as any)?.height;
      if (initHeight === decoratorProps.style.height) {
        decoratorProps.style.height += 10;
      } else {
        decoratorProps.style.height = initHeight;
      }
    });
  };
  return (
    <div {...props}>
      <FormProvider form={form}>
        <button
          onClick={() => {
            form.getFieldState('name', (state) => {
              if (_.includes(state.componentProps?.placeholder, '你是谁')) {
                state.componentProps = { placeholder: '我是我' };
              } else {
                state.componentProps = { placeholder: '你是谁' };
              }
            });
          }}
        >
          切换name组件的componentProps[placeholder]
        </button>
        <MyField title="名称" name="name" required component={[Input, {}]} decorator={[FormItem]} />
        <MyField title="名称长度" name="nameLength" component={[Label]} decorator={[FormItem]} />
        <button onClick={ageStyleToggler}>切换age组件的decoratorProps[style.height]</button>
        <MyField
          title="年龄"
          name="age"
          required
          component={[InputDigit, {}]}
          decorator={[FormItem, { style: { height: 30 } }]}
        />
        <button
          onClick={() => {
            form.getFieldState('password', (state) => {
              let components = state.component as any;
              if (components[0] === Password) {
                state.component = [Input];
              } else {
                state.component = [Password];
              }
            });
          }}
        >
          切换password组件的Component
        </button>
        <MyField title="密码" name="password" required component={[Password]} decorator={[FormItem, {}]} />
      </FormProvider>
    </div>
  );
};
