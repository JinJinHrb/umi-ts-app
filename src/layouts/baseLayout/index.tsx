import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import HeaderContent from './header';
import MenuContent from './menu';
import styles from './index.less';

const { Header, Content, Sider } = Layout;

export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.container}>
      <Header className={styles.contentHeader}>
        <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </Header>
      <Layout style={{ padding: 0 }}>
        <Sider width={200} style={{ background: '#fff', display: collapsed ? 'none' : 'block' }}>
          <MenuContent />
        </Sider>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
      {/* <Footer className={styles.footerContent}>管理平台通用业务模版</Footer> */}
    </Layout>
  );
};
