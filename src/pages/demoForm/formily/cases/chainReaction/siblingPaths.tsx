import React from 'react';
import { Form, FormItem, NumberPicker, ArrayTable, Editable, Input, FormButtonGroup, Submit } from '@formily/antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { umiConsole } from '@/utils';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    NumberPicker,
    ArrayTable,
  },
});

const form = createForm();

const submitHandler = (data: any) => {
  alert(JSON.stringify(data));
  umiConsole.log('submitHandler #21 data:', data);
};

const schema = {
  type: 'object',
  properties: {
    projects: {
      type: 'array',
      required: true,
      title: 'Projects',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      items: {
        type: 'object',
        properties: {
          sort: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 50,
              title: 'Sort',
              align: 'center',
            },
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          index: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 50,
              title: 'Sort',
              align: 'center',
            },
            properties: {
              index: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          price: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: 'Price' },
            properties: {
              price: {
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                required: true,
                default: 0,
                /* 'x-reactions': {
                  //FIXME，同级使用主动联动会失败
                  //https://github.com/alibaba/formily/discussions/1874
                  //主动联动，不支持相对路径，这是官方的说法
                  target: '.count',
                  fulfill: {
                    state: {
                      value: '{{$self.value}}',
                    },
                  },
                }, */
              },
            },
          },
          count: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: 'Count' },
            properties: {
              count: {
                type: 'number',
                'x-decorator': 'FormItem',
                required: true,
                'x-component': 'NumberPicker',
                default: 0,
                'x-reactions': {
                  // 被动联动，支持相对路径
                  dependencies: ['.price'],
                  when: '{{$deps[0]}}',
                  fulfill: {
                    state: {
                      value: '{{$deps[0]}}',
                    },
                  },
                },
              },
            },
          },

          total: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: 'Total' },
            properties: {
              total: {
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-pattern': 'readPretty',
                'x-reactions': {
                  //拿出同级的price与count数据，取乘积
                  dependencies: ['.price', '.count'],
                  when: '{{$deps[0] && $deps[1]}}',
                  fulfill: {
                    state: {
                      value: '{{$deps[0] * $deps[1]}}',
                    },
                  },
                },
              },
            },
          },

          operations: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
            },
            properties: {
              operations: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: 'Add',
        },
      },
    },
    total: {
      type: 'number',
      title: 'Total',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        addonAfter: '$',
      },
      'x-pattern': 'readPretty',
      'x-reactions': {
        //被动联动，拿出同级的.projects数据
        dependencies: ['.projects'],
        when: '{{$deps.length > 0}}',
        fulfill: {
          state: {
            value: '{{$deps[0].reduce((total,item)=>item.total ? total+item.total : total,0)}}',
          },
        },
      },
    },
  },
};

export default (props: any) => {
  return (
    <Form form={form} layout="vertical" {...props}>
      {/* <SchemaField>
        <SchemaField.Array name="projects" title="Projects" x-decorator="FormItem" x-component="ArrayTable">
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                width: 50,
                title: 'Sort',
                align: 'center',
              }}
            >
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle" />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                width: 80,
                title: 'Index',
                align: 'center',
              }}
            >
              <SchemaField.String x-decorator="FormItem" x-component="ArrayTable.Index" />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: 'Price' }}>
              <SchemaField.Number
                name="price"
                x-decorator="FormItem"
                required
                x-component="NumberPicker"
                x-component-props={{}}
                default={0}
                x-reactions={{
                  //FIXME，同级使用主动联动会失败
                  //https://github.com/alibaba/formily/discussions/1874
                  //主动联动，不支持相对路径，这是官方的说法
                  target: '.count',
                  fulfill: {
                    state: {
                      value: '{{$self.value}}',
                    },
                  },
                }}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: 'Count' }}>
              <SchemaField.Number name="count" x-decorator="FormItem" required x-component="NumberPicker" default={0} />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: 'Total' }}>
              <SchemaField.Number
                x-decorator="FormItem"
                name="total"
                x-component="NumberPicker"
                x-pattern="readPretty"
                x-component-props={{}}
                x-reactions={{
                  //拿出同级的price与count数据，取乘积
                  dependencies: ['.price', '.count'],
                  when: '{{$deps[0] && $deps[1]}}',
                  fulfill: {
                    state: {
                      value: '{{$deps[0] * $deps[1]}}',
                    },
                  },
                }}
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                title: 'Operations',
                dataIndex: 'operations',
                width: 200,
                fixed: 'right',
              }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTable.Remove" />
                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                <SchemaField.Void x-component="ArrayTable.MoveUp" />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void x-component="ArrayTable.Addition" title="Add" />
        </SchemaField.Array>
        <SchemaField.Number
          name="total"
          title="Total"
          x-decorator="FormItem"
          x-component="NumberPicker"
          x-component-props={{
            addonAfter: '$',
          }}
          x-pattern="readPretty"
          x-reactions={{
            //被动联动，拿出同级的.projects数据
            dependencies: ['.projects'],
            when: '{{$deps.length > 0}}',
            fulfill: {
              state: {
                value: '{{$deps[0].reduce((total,item)=>item.total ? total+item.total : total,0)}}',
              },
            },
          }}
        />
      </SchemaField> */}
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={submitHandler}>提交</Submit>
      </FormButtonGroup>
    </Form>
  );
};
