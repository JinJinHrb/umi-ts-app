import React, { useEffect, useMemo, useState } from 'react';
import UserSetting from './userSetting';
import { TITLE } from '@/utils/constants';
import { Breadcrumb } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { StyledDiv, StyledHeaderElement, StyledHeaderElementTouch } from './styled';
import { useLocation, useRouteMatch } from 'umi';
import { LEFT_DOCKER_WIDTH } from '@/utils/constants';
import _ from 'lodash';

interface IBaseLayoutHeader {
  collapsed: boolean;
  setCollapsed: Function;
}

export default function ({ collapsed, setCollapsed }: IBaseLayoutHeader) {
  const [myBreadcrumb, setMyBreadcrumb] = useState<any>(undefined);

  const MenuFold = useMemo(
    () => (props: any) => <div {...props}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>,
    [collapsed],
  );

  const location = useLocation();
  const match = useRouteMatch();
  useEffect(() => {
    const pathname = _.trim(location?.pathname);
    const arr = pathname.split('/').filter((a) => a);
    // console.log('baseLayout/header #28 \n\tlocation:', location, '\n\tmatch:', match, '\n\tarr:', arr);
    const breadcrumbItems = arr.map((k, index) => <Breadcrumb.Item key={k}>{k}</Breadcrumb.Item>);
    if (!_.isEmpty(breadcrumbItems)) {
      setMyBreadcrumb(<Breadcrumb>{breadcrumbItems}</Breadcrumb>);
    } else {
      setMyBreadcrumb(undefined);
    }
  }, [location, match]);

  return (
    <>
      <StyledDiv>
        {!collapsed && <span style={{ width: LEFT_DOCKER_WIDTH - 70 }}>{TITLE}</span>}
        <StyledHeaderElementTouch>
          <MenuFold onClick={() => setCollapsed(!collapsed)} />
        </StyledHeaderElementTouch>
        {myBreadcrumb && (
          <StyledHeaderElement>
            {/* <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
            {myBreadcrumb}
          </StyledHeaderElement>
        )}
      </StyledDiv>
      <UserSetting />
    </>
  );
}
