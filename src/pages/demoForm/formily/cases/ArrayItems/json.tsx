import React, { ReactChild, useCallback } from 'react';
import { createForm, Form as CoreForm } from '@formily/core';
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
import { FormItem, FormLayout, NumberPicker, Form, Submit, FormButtonGroup } from '@formily/antd';
import Items from './Items';
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

const schema: ISchema = {
  type: 'void',
  'x-component': 'FormLayout',
  'x-component-props': { labelCol: 6, wrapperCol: 10 },
  properties: {
    person: {
      type: 'object',
      title: '个人信息',
      'x-component': 'Card',
      'x-decorator': 'FormItem',
      properties: {
        name: {
          type: 'string',
          title: '姓名',
          required: true,
          'x-component': 'Input',
          'x-component-props': {},
          'x-decorator': 'FormItem',
        },
        age: {
          type: 'number',
          title: '年龄',
          required: true,
          'x-component': 'NumberPicker',
          'x-component-props': {},
          'x-decorator': 'FormItem',
        },
      },
    },
    contact: {
      type: 'array',
      title: '联系信息',
      'x-component': 'Items',
      'x-decorator': 'FormItem',
      items: {
        type: 'object',
        title: '信息',
        'x-component': 'Card',
        properties: {
          phone: {
            type: 'string',
            title: '电话',
            format: 'phone',
            required: true,
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator': 'FormItem',
          },
          email: {
            type: 'string',
            title: '电子邮件',
            format: 'email',
            required: true,
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator': 'FormItem',
          },
        },
      },
    },
  },
};

export default (props: any) => {
  const submitHandler = useCallback((data: any) => {
    alert(JSON.stringify(data));
    umiConsole.log('submitHandler #99 data:', data);
    // form.setValuesIn('username', 'WangFan');
  }, []);

  //使用schema
  return (
    <div {...props}>
      <FormProvider form={form}>
        <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={submitHandler}>
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              提交
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
        <FormConsumer>
          {(form: CoreForm) => {
            return <div style={{ padding: '10px' }}>{JSON.stringify(form.values) as ReactChild}</div>;
          }}
        </FormConsumer>
      </FormProvider>
    </div>
  );
};
