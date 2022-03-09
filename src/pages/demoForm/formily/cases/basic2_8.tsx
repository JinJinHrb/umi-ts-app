import React from 'react';
import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { useMemo } from 'react';
import { sleep, umiConsole } from '@/utils';

export default (props: any) => {
  const form = useMemo(() => {
    return createForm({
      effects() {},
    });
  }, []);

  return (
    <div {...props}>
      <p>组合校验 异步校验</p>
      <button
        onClick={async () => {
          umiConsole.log('create Field');
          //我们使用自定义的校验器，并且设置只有blur的时候才触发校验
          let field = form.createField({
            name: 'name',
          });
          field.setValidator([
            { required: true },
            { format: 'email' },
            {
              triggerType: 'onBlur',
              validator: async (value) => {
                sleep(1000);
                let str = value as string;
                if (!str.startsWith('fish@')) {
                  return '只支持fish的发件人';
                }
                return '';
              },
            },
          ]);

          //直接设置value
          field.onInput('');
          await sleep(500);
          //2个错误，非必填，不是fish开头
          umiConsole.log('2个错误，非必填，不是fish开头 #43', field.feedbacks, field.errors);

          //直接设置value
          field.onInput('fish@123');
          await sleep(500);
          //1个错误，非email格式
          umiConsole.log('1个错误，非email格式 #49', field.feedbacks, field.errors);

          //直接设置value
          field.onInput('123@163.com');
          await sleep(500);
          //1个错误，非fish开头
          umiConsole.log('没有错误 #55', field.feedbacks, field.errors);

          field.onBlur();
          await sleep(1100);
          umiConsole.log('1个错误，非fish开头 #59', field.feedbacks, field.errors);
        }}
      >
        组合多种方式的校验
      </button>
    </div>
  );
};
