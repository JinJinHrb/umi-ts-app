import React, { useState, useEffect, useCallback } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from '@formily/antd';
import { action } from '@formily/reactive';
import { Card, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { queryGeoLocationData } from '@/services/geo';
import { GET_GEO_LOCATION_QUERY_KEY } from '@/utils/constants';
import { queryClient } from '@/utils/reactQuery';
import _ from 'lodash';
import { umiConsole } from '@/utils';
import XtSelectInput from '@/components/xt/selectInput';
import cls from 'classnames';

const form = createForm({
  validateFirst: true,
});

const IDUpload = (props: any) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  );
};

interface IAddress {
  name: any;
  code: any;
  cities: any;
  districts: string;
}

interface IObj {
  label: string;
  value: string;
  children?: IObj[];
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    IDUpload,
    ArrayItems,
    Editable,
    XtSelectInput,
  },
  scope: {
    fetchAddress: (field: any) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string') {
            const obj: IObj = {
              label: value,
              value: key,
            };
            return buf.concat(obj as any);
          }
          const { name, code, cities, districts } = value as IAddress;
          const _cities = transform(cities) as any;
          const _districts = transform(districts) as any;
          const obj: IObj = {
            label: name,
            value: code,
          };
          const children = _cities.length ? _cities : _districts.length ? _districts : undefined;
          if (children) {
            obj.children = children;
          }
          return buf.concat(obj as any);
        }, []);
      };

      //   field.loading = true; // 无作用
      //   fetch('//unpkg.com/china-location/dist/location.json')
      // .then((res) => res.json())
      //   queryGeoLocationData()
      queryClient
        .fetchInfiniteQuery(GET_GEO_LOCATION_QUERY_KEY, queryGeoLocationData)
        .then((data) => {
          //   umiConsole.log('fetchAddress #95 data:', data);
          return _.get(data, 'pages[0]');
        })
        .then(
          (action as { bound: Function }).bound((data: any) => {
            field.dataSource = transform(data);
            // field.loading = false; // 无作用
            // umiConsole.log('details/SchemaField #103 dataSource:', field.dataSource);
          }),
        );
    },
  },
});

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '姓',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '名',
          },
        },
      },
    },

    socialAccount: {
      type: 'object',
      title: '社交账号',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'XtSelectInput',
      /* 'x-component-props': {
          upperTitle: '社交账号',
        }, */
      enum: [
        {
          label: 'Facebook',
          value: 'Facebook',
        },
        {
          label: 'Twitter',
          value: 'Twitter',
        },
        {
          label: 'QQ',
          value: 'QQ',
        },
        {
          label: 'Wechat',
          value: 'Wechat',
        },
        {
          label: 'Linkedin',
          value: 'Linkedin',
        },
        {
          label: 'Line',
          value: 'Line',
        },
        {
          label: 'WhatsApp',
          value: 'WhatsApp',
        },
      ],
    },
    payAmount: {
      type: 'object',
      title: '币种',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'XtSelectInput',
      'x-component-props': {
        // upperTitle: '币种',
        inputType: 'number',
      },
      /*
        人民币（CNY）￥
        欧元（EUR）€
        英镑（GBP）￡
        澳元（AUD）A$
        日元（JPY）¥
        加元（CAD）C$
        新西兰元（NZD）NZ$
        澳门币（MOP）MOP$
        香港港元（HKD）HK$
        韩元（KRW）₩
        俄罗斯卢布（RUB）₽
        */
      enum: [
        { value: 'CNY', label: '人民币（CNY）' },
        { value: 'USD', label: '美元（USD）' },
        { value: 'EUR', label: '欧元（EUR）' },
        { value: 'GBP', label: '英镑（GBP）' },
        { value: 'AUD', label: '澳元（AUD）' },
        { value: 'JPY', label: '日元（JPY）' },
        { value: 'CAD', label: '加元（CAD）' },
        { value: 'NZD', label: '新西兰元（NZD）' },
        { value: 'MOP', label: '澳门币（MOP）' },
        { value: 'HKD', label: '香港港元（HKD）' },
        { value: 'KRW', label: '韩元（KRW）' },
        { value: 'RUB', label: '俄罗斯卢布（RUB）' },
      ],
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '第三性别',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: '生日',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      required: true,
      title: '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'void',
      required: true,
      title: '身份证复印件',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      required: true,
      title: '联系人信息',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: '完善联系人信息',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                fulfill: {
                  schema: {
                    title: '{{$self.query(".name").value() }}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: '姓名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: '邮箱',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: '手机号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '新增联系人',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
};

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        firstName: 'Aston',
        lastName: 'Martin',
        email: 'aston_martin@aston.com',
        gender: 1,
        birthday: '1997-01-03',
        address: ['310000', '310000', '310110'],
        idCard: [
          {
            name: 'fake id card',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            uid: 'rc-upload-1615825692847-2',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          // public/idCards/WX20220126-115446.png
          {
            name: 'student card',
            thumbUrl: '/idCards/WX20220126-115446.png',
            uid: 'rc-upload-1615825692847-3',
            url: '/idCards/WX20220126-115446.png',
          },
        ],
        contacts: [
          { name: '张三', phone: '13245633378', email: 'zhangsan@gmail.com' },
          { name: '李四', phone: '16873452678', email: 'lisi@gmail.com' },
        ],
        socialAccount: { selected: 'Twitter', entered: 'xt_official' },
      });
      setLoading(false);
    }, 2000);
  }, []);

  const submitHandler = useCallback((data: any) => {
    alert(JSON.stringify(data));
    umiConsole.log('submitHandler #338 data:', data);
    // form.setValuesIn('username', 'WangFan');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="编辑用户" style={{ width: 620 }}>
        <Spin spinning={loading}>
          <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={submitHandler}>
            <SchemaField schema={schema} />
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};
