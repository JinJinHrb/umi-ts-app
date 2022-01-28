import React from 'react';
import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep, umiConsole } from '@/utils';

/**
 * 用户输入后再设置初始值
 */
export default (props: any) => {
  const form = useMemo(() => {
    return createForm({
      effects() {
        onFieldChange('name', (field, form) => {
          //当Field是VoidField的时候，没有value
          let field2 = field as Field;
          umiConsole.log('onFieldChange #17 field : [name] value = ', field2.value);
        });
      },
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
      <p>用户输入后再设置初始值（会失败）</p>
      <button
        onClick={async () => {
          umiConsole.log('create Field');
          //初始化的时候，值为undefined
          let field = form.createField({ name: 'name' });

          //使用onInput，来模拟用户输入
          await sleep(1000);
          field.onInput('1');

          //onInput以后，使用form来设置initialValues是会失败的，无法覆盖进去
          await sleep(1000);
          form.setInitialValues({
            name: '2',
          });
        }}
      >
        点击，初始化name的value值
      </button>
    </div>
  );
};
