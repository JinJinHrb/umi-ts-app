import React, { useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
import { IFormDemo } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLiOption, StyledSubPage } from './styled';
import BasicForm from '@/pages/demoForm/formRender/cases/basic';
import BasicForm2 from '@/pages/demoForm/formRender/cases/basic2';
import ChainReaction from '@/pages/demoForm/formRender/cases/chainReaction';
import { Typography } from 'antd';
import './cases/styles.less';
import { umiConsole } from '@/utils';

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

const FormRender = ({ dispatch, formDemo, loading }: any) => {
  //   const [liSelected, selectLi0] = useState(0);
  umiConsole.log('FormilyDemo #192 formDemo:', formDemo, 'loading:', loading);
  const { index: liSelected } = formDemo || { index: 0 };

  useEffect(() => {
    dispatch({
      type: 'formDemo/querySelectedIndex',
      payload: {
        pathname: history.location.pathname,
        defaultIndex: 0,
      },
    });
  }, []);

  const selectLi = (index: number) => {
    if (index > -1) {
      //   selectLi0(index);
      dispatch({
        type: 'formDemo/setSelectedIndex',
        payload: {
          pathname: history.location.pathname,
          index,
        },
      });
    }
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

export default connect(({ dispatch, formDemo, loading }: IFormDemo) => ({
  dispatch,
  formDemo,
  loading: loading.effects['formDemo/querySelectedIndex'],
}))(FormRender);
