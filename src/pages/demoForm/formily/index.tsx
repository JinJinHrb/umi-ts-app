import React, { useRef, useState } from 'react';
import { connect } from 'umi';
import { QueryTableState, Loading } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLiOption, StyledSubPage } from './styled';
import BasicForm from '@/pages/demoForm/formily/cases/basic';
import { Typography } from 'antd';
const { Text } = Typography;

const options = [
  {
    text: 'BasicForm',
    component: <BasicForm />,
    key: 'BasicForm',
  },
];

interface IRefs {
  ul: any;
}

const HookForms = (
  {
    /* dispatch, queryTable, loading  */
  },
) => {
  const [liSelected, selectLi0] = useState(0);

  const selectLi = (index: number) => {
    if (index > -1) selectLi0(index);
  };
  const optionLis = options.map((el, index) => {
    return (
      <StyledLiOption key={el.key} onClick={selectLi.bind(this, index)}>
        <Text type={liSelected !== index ? 'secondary' : undefined}>{el.text}</Text>
      </StyledLiOption>
    );
  });

  return (
    <StyledDiv>
      <StyledUl>{optionLis}</StyledUl>
      <StyledSubPage>{options[liSelected]?.component}</StyledSubPage>
    </StyledDiv>
  );
};

export default connect(({ queryTable, loading }: { queryTable: QueryTableState; loading: Loading }) => ({
  queryTable,
  loading: loading.models.queryTable,
}))(HookForms);
