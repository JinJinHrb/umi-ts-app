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

  const blanks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(<span key={`blk_${i}`}>&nbsp;</span>);
    }
    return <>{arr}</>;
  }, []);

  return (
    <div {...props}>
      <button
        onClick={async () => {
          umiConsole.log('create Field');
          //我们使用自定义的校验器，并且设置只有blur的时候才触发校验
          let field = form.createField({
            name: 'name',
          });
          field.setValidator({
            triggerType: 'onBlur',
            validator: (value) => {
              if (value != '123') {
                umiConsole.log('#33 value', value);
                return '输入的字符串不是123';
              }
              return '';
            },
          });

          //直接设置value
          field.onInput('f');
          await sleep(500);
          //field.errors依然为空数组，因为triggerType为onBlur
          umiConsole.log('#45', field.feedbacks, field.errors);

          //模拟控件blur
          field.onBlur();
          await sleep(500);
          //field.errors现在不是为空数组了，因为blur的时候触发了校验
          //它的值为1个元素的数组
          umiConsole.log('#52', field.feedbacks, field.errors);

          field.onInput('123');
          await sleep(500);
          // field.errors依然不为空，因为没有 blur 重新触发校验
          umiConsole.log('#56', field.feedbacks, field.errors);
          field.onBlur();
          await sleep(500);
          umiConsole.log('#58', field.feedbacks, field.errors);
        }}
      >
        onBlur触发校验
      </button>

      {blanks}

      <button
        onClick={async () => {
          umiConsole.log('create Field');
          //我们使用自定义的校验器，并且设置只有blur的时候才触发校验
          let field = form.createField({
            name: 'name2',
          });
          field.setValidator({
            triggerType: 'onFocus',
            validator: (value) => {
              if (value != '123') {
                umiConsole.log('#76 value', value);
                return '输入的字符串不是123';
              }
              return '';
            },
          });

          field.onFocus();
          await sleep(500);
          umiConsole.log('#86', field.feedbacks, field.errors);

          //直接设置value
          field.onInput('f');
          await sleep(500);
          //field.errors依然为空数组
          umiConsole.log('#92', field.feedbacks, field.errors);

          //模拟控件focus
          field.onFocus();
          await sleep(500);
          //field.errors现在不是为空数组了
          //它的值为1个元素的数组
          umiConsole.log('#99', field.feedbacks, field.errors);

          field.onBlur();
          await sleep(500);
          field.onInput('123');
          await sleep(500);
          // field.errors依然不为空，因为没有 onFocus 重新触发校验
          umiConsole.log('#106', field.feedbacks, field.errors);
          field.onFocus();
          await sleep(500);
          umiConsole.log('#109', field.feedbacks, field.errors);
        }}
      >
        onFocus触发校验
      </button>
    </div>
  );
};
