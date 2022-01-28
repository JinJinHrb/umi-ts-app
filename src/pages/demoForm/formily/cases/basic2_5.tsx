import React from 'react';
import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { useMemo } from 'react';
import { sleep, umiConsole } from '@/utils';

/**
 * 显示与隐藏
 */
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
      <p>显示与隐藏</p>
      <button
        onClick={async () => {
          umiConsole.log('create Field');
          //createField的时候就会触发onFieldChange，包括value与component
          let field = form.createField({ name: 'name' });

          //模拟用户输入
          field.onInput('fish');
          umiConsole.log(field.value);

          //使用display为none，会导致value被清空为undefined
          await sleep(1000);
          field.display = 'none';
          umiConsole.log(field.value);
        }}
      >
        点击，更改[name]的display为none
      </button>

      <span>{blanks}</span>

      <button
        onClick={async () => {
          umiConsole.log('create Field');
          //createField的时候就会触发onFieldChange，包括value与component
          let field = form.createField({ name: 'name2' });

          //模拟用户输入
          field.onInput('cat');
          umiConsole.log(field.value);

          //使用display为hidden，value依然不会被清空
          await sleep(1000);
          field.display = 'hidden';
          umiConsole.log(field.value);
        }}
      >
        点击，更改[name2]的display为hidden
      </button>
    </div>
  );
};
