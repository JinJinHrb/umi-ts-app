import React, { useMemo, useState } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';
import { Button, Space } from 'antd';

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
  },
});

export default (props: any) => {
  const [current, setCurrent] = useState({});
  const form = useMemo(() => createForm(), [current]);
  return (
    <Form form={form} layout="vertical" {...props}>
      <Space style={{ marginBottom: 20 }}>
        <Button
          onClick={() => {
            setCurrent({
              type: 'object',
              properties: {
                aa: {
                  type: 'string',
                  title: 'AA',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: 'Input',
                  },
                },
              },
            });
          }}
        >
          Schema1
        </Button>
        <Button
          onClick={() => {
            setCurrent({
              type: 'object',
              properties: {
                aa: {
                  type: 'string',
                  title: 'AA',
                  'x-decorator': 'FormItem',
                  enum: [
                    {
                      label: '111',
                      value: '111',
                    },
                    {
                      label: '222',
                      value: '222',
                    },
                  ],
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: 'Select',
                  },
                },
                bb: {
                  type: 'string',
                  title: 'BB',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            });
          }}
        >
          Schema2
        </Button>
      </Space>
      <SchemaField schema={current} />
    </Form>
  );
};
