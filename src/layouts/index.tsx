import React, { useMemo } from 'react';
import { Redirect } from 'umi';
import SimpleLayout from './simpleLayout';
import BaseLayout from './baseLayout';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/utils/reactQuery';

export default function (props: any) {
  // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
  const isLogin = window.localStorage.getItem('userid');
  const { pathname } = props.location;

  if (pathname === '/login') {
    return <SimpleLayout>{props.children}</SimpleLayout>;
  }

  if (!isLogin && pathname !== '/login') {
    return <Redirect to={`/login?timestamp=${new Date().getTime()}`} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>{props.children}</BaseLayout>;
    </QueryClientProvider>
  );
}
