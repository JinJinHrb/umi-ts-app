import React from 'react';
import {
  createForm,
  onFieldChange,
  onFieldInit,
  onFieldInputValueChange,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFormInit,
  onFormInputChange,
  onFormMount,
  onFormSubmit,
  onFormUnmount,
  onFormValuesChange,
} from '@formily/core';

import { useMemo } from 'react';
import { sleep, umiConsole } from '@/utils';

export default (props: any) => {
  const blanks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(<span key={`blk_${i}`}>&nbsp;</span>);
    }
    return <>{arr}</>;
  }, []);

  const form = useMemo(() => {
    return createForm({
      effects() {
        //createField的时候自动触发
        onFieldInit('name', (field) => {
          umiConsole.log('字段[name]初始化');
        });

        //onMount的时候手动触发
        onFieldMount('name', (field) => {
          umiConsole.log('字段[name] mount');
        });

        //onUnMount的时候手动触发
        onFieldUnmount('name', (field) => {
          umiConsole.log('字段[name] unmount');
        });

        //onChange的时候自动触发，默认就是只有value变化的时候触发
        //注意，在首次createField也会自动触发
        onFieldChange('name', (field) => {
          umiConsole.log('字段[name] change');
        });

        //onChange的时候自动触发，默认就是只有value变化的时候触发
        //注意，在首次createField也会自动触发，即使是非value的属性
        onFieldChange('name', 'componentProps', (field) => {
          umiConsole.log('字段[name] comonentProps change');
        });

        //onValueChange的时候自动触发，只有value变化的时候触发
        //注意，首次不会自动触发
        onFieldValueChange('name', (field) => {
          umiConsole.log('字段[name] value change');
        });

        //onInput的时候手动触发，这个注意与onFieldValueChange的不同
        onFieldInputValueChange('name', (field) => {
          umiConsole.log('字段[name] value input change');
        });
      },
    });
  }, []);

  const form2 = useMemo(() => {
    return createForm({
      effects() {
        //createForm的时候触发
        onFormInit(() => {
          umiConsole.log('表单初始化');
        });

        //onMount的时候手动触发
        onFormMount(() => {
          umiConsole.log('表单 mount');
        });

        //onUnMount的时候手动触发
        onFormUnmount(() => {
          umiConsole.log('表单 unmount');
        });

        //onChange的时候自动触发，默认就是只有value变化的时候触发
        //注意，首次不会触发
        onFormValuesChange(() => {
          umiConsole.log('form value change');
        });

        //onInput的时候手动触发，这个注意与onFieldValueChange的不同
        onFormInputChange(() => {
          umiConsole.log('form value input change');
        });

        //submit的时候自动触发
        onFormSubmit(() => {
          umiConsole.log('form submit');
        });
      },
    });
  }, []);

  return (
    <div {...props}>
      <button
        onClick={async () => {
          //触发onFieldInit，首次会触发onFieldChange
          umiConsole.log('createField');
          let field = form.createField({ name: 'name' });

          //触发onFieldMount
          await sleep(100);
          umiConsole.log('onMount');
          field.onMount();

          //触发onFieldChange
          await sleep(100);
          umiConsole.log('set componentProps');
          field.componentProps = { size: 10 };

          //触发onFieldChange与onFieldValueChange
          await sleep(100);
          umiConsole.log('set value');
          field.value = 10;

          //触发onFieldChange与onFieldValueChange,onFieldInputValueChange
          await sleep(100);
          umiConsole.log('set input');
          field.onInput('cat');

          //触发onUnmount
          await sleep(100);
          umiConsole.log('set onUnmount');
          field.onUnmount();

          await sleep(100);
          field.getState((state) => {
            umiConsole.log('#94 state:', state);
          });

          let value = field.query('.name').value();
          umiConsole.log('#98 field[name] value:', value);
        }}
      >
        触发field的生命周期
      </button>

      {blanks}

      <button
        onClick={async () => {
          //触发onFieldInit
          umiConsole.log('createField');
          let field = form.createField({ name: 'name' });

          //触发form.onMount
          await sleep(100);
          umiConsole.log('onMount');
          form.onMount();

          //不会触发onFormValuesChange
          await sleep(100);
          umiConsole.log('set componentProps');
          field.componentProps = { size: 10 };

          //触发onFormValuesChange
          await sleep(100);
          umiConsole.log('set value');
          field.value = 10;

          //触发onFormInputChange与onFormValuesChange
          await sleep(100);
          umiConsole.log('set input');
          field.onInput('cat');

          //触发onSubmit
          await sleep(100);
          umiConsole.log('set submit');
          form.submit();

          //触发onUnmount
          await sleep(100);
          umiConsole.log('set onUnmount');
          form.onUnmount();
        }}
      >
        触发form的生命周期
      </button>
    </div>
  );
};
