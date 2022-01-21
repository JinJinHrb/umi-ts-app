import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import HeaderContent from './header';
import MenuContent from './menu';
import styles from './index.less';
import { LEFT_DOCKER_WIDTH } from '@/utils/constants';
import classnames from 'classnames';

const { Header, Content, Sider } = Layout;

export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.container}>
      <Header className={classnames(collapsed && styles.shrink, styles.contentHeader)}>
        <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Layout style={{ padding: 0, minHeight: 'calc(100vh - 44px)' }}>
        <Sider width={LEFT_DOCKER_WIDTH} style={{ background: '#fff', display: collapsed ? 'none' : 'block' }}>
          <MenuContent />
        </Sider>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
      {/* <Footer className={styles.footerContent}>管理平台通用业务模版</Footer> */}
    </Layout>
  );
};
