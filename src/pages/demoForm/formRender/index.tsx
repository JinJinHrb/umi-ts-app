import React, { useRef, useState } from 'react';
import { connect } from 'umi';
import { QueryTableState, Loading } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLiOption, StyledSubPage } from './styled';
import BasicForm from '@/pages/demoForm/formRender/cases/basic';
import BasicForm2 from '@/pages/demoForm/formRender/cases/basic2';
import ChainReaction from '@/pages/demoForm/formRender/cases/chainReaction';
import { Typography } from 'antd';
import './cases/styles.less';

const { Text } = Typography;

const options = [
  {
    text: 'Basic',
    component: <BasicForm />,
    key: 'basic',
  },
  {
    text: 'Basic2',
    component: <BasicForm2 />,
    key: 'basic2',
  },
  {
    text: 'Chain Reaction',
    component: <ChainReaction />,
    key: 'chainReaction',
  },
];

interface IRefs {
  ul: any;
}

const FormRender = (
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
      <StyledSubPage className={'form-render-cases'}>{options[liSelected]?.component}</StyledSubPage>
    </StyledDiv>
  );
};

export default connect(({ queryTable, loading }: { queryTable: QueryTableState; loading: Loading }) => ({
  queryTable,
  loading: loading.models.queryTable,
}))(FormRender);
