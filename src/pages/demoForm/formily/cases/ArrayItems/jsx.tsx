import React, { ReactChild } from 'react';
import { createForm, Form } from '@formily/core';
import {
  FormProvider,
  Field,
  FormConsumer,
  ObjectField,
  VoidField,
  ArrayField,
  createSchemaField,
  ISchema,
} from '@formily/react';
import { Input } from 'antd';
import Card from './Card';
import { FormItem, FormLayout, NumberPicker } from '@formily/antd';
import Items from './Items';
import useRemainingAmount from './useRemainingAmount';
import { umiConsole } from '@/utils';

const form = createForm({
  effects: () => {},
});

//创建SchemaField的时候，就已经有options
const SchemaField = createSchemaField({
  components: {
    Input,
    NumberPicker,
    Card,
    FormLayout,
    FormItem,
    Items,
  },
});

export default () => {
  const remainingAmount = useRemainingAmount();
  umiConsole.log('demoForm/formily/cases/ArrayItmes #38 remainingAmount:', remainingAmount);
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 10 }}>
          <SchemaField.Object title="个人信息" name="person" x-component={'Card'} x-decorator={'FormItem'}>
            <SchemaField.String
              title="姓名"
              name="name"
              required={true}
              x-component={'Input'}
              x-decorator={'FormItem'}
            />
            <SchemaField.Number
              title="年龄"
              name="age"
              required={true}
              x-component={'NumberPicker'}
              x-decorator={'FormItem'}
            />
          </SchemaField.Object>
          <SchemaField.Array title="个人信息" name="contact" x-component={'Items'} x-decorator={'FormItem'}>
            <SchemaField.Object title="信息" x-component={'Card'} x-decorator={'FormItem'}>
              <SchemaField.String
                title="电话"
                name="phone"
                required={true}
                format="phone"
                x-component={'Input'}
                x-decorator={'FormItem'}
              />
              <SchemaField.Number
                title="电子邮件2"
                name="email"
                required={true}
                format="email"
                x-component={'Input'}
                x-decorator={'FormItem'}
              />
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField.Void>
      </SchemaField>
      <FormConsumer>
        {(form: Form) => {
          return JSON.stringify(form.values) as ReactChild;
        }}
      </FormConsumer>
    </FormProvider>
  );
};
