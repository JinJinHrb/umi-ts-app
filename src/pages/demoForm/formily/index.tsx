import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { IFormDemo } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLiOption, StyledSubPage } from './styled';
import { Typography } from 'antd';
import BasicForm from '@/pages/demoForm/formily/cases/basic1';
import BasicForm2_1 from '@/pages/demoForm/formily/cases/basic2_1';
import BasicForm2_2 from '@/pages/demoForm/formily/cases/basic2_2';
import BasicForm2_3 from '@/pages/demoForm/formily/cases/basic2_3';
import BasicForm2_4 from '@/pages/demoForm/formily/cases/basic2_4';
import BasicForm2_5 from '@/pages/demoForm/formily/cases/basic2_5';
import BasicForm2_6 from '@/pages/demoForm/formily/cases/basic2_6';
import BasicForm2_7 from '@/pages/demoForm/formily/cases/basic2_7';
import BasicForm2_8 from '@/pages/demoForm/formily/cases/basic2_8';
import DetailsForm from '@/pages/demoForm/formily/cases/details';
import XtForm from '@/pages/demoForm/formily/cases/xt';
import ValidatesForm from '@/pages/demoForm/formily/cases/validates';
import VerifyCodeForm from '@/pages/demoForm/formily/cases/VerifyCodeBySchema/index';
import TraditionalControlledForm from '@/pages/demoForm/formily/cases/traditionalControlledForm';
import ResponsiveControlledForm from '@/pages/demoForm/formily/cases/responsiveControlledForm';
import SchemaControlledForm from '@/pages/demoForm/formily/cases/schemaControlledForm';
import ArrayItemsForm from '@/pages/demoForm/formily/cases/ArrayItems/json';
import PassiveChainReactionForm from '@/pages/demoForm/formily/cases/chainReaction/passive';
import PassiveChainReactionForm2 from '@/pages/demoForm/formily/cases/chainReaction/passive2';
import InitiativeChainReactionForm from '@/pages/demoForm/formily/cases/chainReaction/initiative';
import InitiativeChainReactionForm2 from '@/pages/demoForm/formily/cases/chainReaction/initiative2';
import ScopeChainReactionForm from '@/pages/demoForm/formily/cases/chainReaction/scope';
import CustomForm from '@/pages/demoForm/formily/cases/Custom/index';
import InteractiveModeForm from '@/pages/demoForm/formily/cases/interactiveMode';
import FieldLifeCycleForm from '@/pages/demoForm/formily/cases/fieldLifeCycleForm';
import SiblingPathsForm from '@/pages/demoForm/formily/cases/chainReaction/siblingPaths';
// import '@formily/antd/dist/antd.css';
import 'antd/dist/antd.css';
import './styles.less';
import { umiConsole } from '@/utils';

const { Text } = Typography;

const options = [
  {
    text: 'ArrayItemsForm',
    component: <ArrayItemsForm className={'formily-demos'} />,
    key: 'ArrayItemsForm',
  },
  {
    text: 'BasicForm',
    component: <BasicForm className={'formily-demos'} />,
    key: 'BasicForm',
  },
  {
    text: 'BasicForm2_1',
    component: <BasicForm2_1 className={'basic'} />,
    key: 'BasicForm2_1',
  },
  {
    text: 'BasicForm2_2',
    component: <BasicForm2_2 className={'basic'} />,
    key: 'BasicForm2_2',
  },
  {
    text: 'BasicForm2_3',
    component: <BasicForm2_3 className={'basic'} />,
    key: 'BasicForm2_3',
  },
  {
    text: 'BasicForm2_4',
    component: <BasicForm2_4 className={'basic'} />,
    key: 'BasicForm2_4',
  },
  {
    text: 'BasicForm2_5',
    component: <BasicForm2_5 className={'basic'} />,
    key: 'BasicForm2_5',
  },
  {
    text: 'BasicForm2_6',
    component: <BasicForm2_6 className={'basic'} />,
    key: 'BasicForm2_6',
  },
  {
    text: 'BasicForm2_7',
    component: <BasicForm2_7 className={'basic'} />,
    key: 'BasicForm2_7',
  },
  {
    text: 'BasicForm2_8',
    component: <BasicForm2_8 className={'basic'} />,
    key: 'BasicForm2_8',
  },
  {
    text: 'CustomForm',
    component: <CustomForm className={'custom-formily-demos'} />,
    key: 'CustomForm',
  },
  {
    text: 'DetailsForm',
    component: <DetailsForm />,
    key: 'DetailsForm',
  },
  {
    text: 'ValidatesForm',
    component: <ValidatesForm className={'formily-demos'} />,
    key: 'ValidatesForm',
  },
  {
    text: 'VerifyCodeForm',
    component: <VerifyCodeForm className={'formily-demos'} />,
    key: 'VerifyCodeForm',
  },
  {
    text: 'TraditionalControlledForm',
    component: <TraditionalControlledForm className={'formily-demos'} />,
    key: 'TraditionalControlledForm',
  },
  {
    text: 'ResponsiveControlledForm',
    component: <ResponsiveControlledForm className={'formily-demos'} />,
    key: 'ResponsiveControlledForm',
  },
  {
    text: 'SchemaControlledForm',
    component: <SchemaControlledForm className={'formily-demos'} />,
    key: 'SchemaControlledForm',
  },
  {
    text: 'InitiativeChainReactionForm',
    component: <InitiativeChainReactionForm className={'formily-demos'} />,
    key: 'InitiativeChainReactionForm',
  },
  {
    text: 'InitiativeChainReactionForm2',
    component: <InitiativeChainReactionForm2 />,
    key: 'InitiativeChainReactionForm2',
  },
  {
    text: 'PassiveChainReactionForm',
    component: <PassiveChainReactionForm className={'formily-demos'} />,
    key: 'PassiveChainReactionForm',
  },
  {
    text: 'PassiveChainReactionForm2',
    component: <PassiveChainReactionForm2 />,
    key: 'PassiveChainReactionForm2',
  },
  {
    text: 'ScopeChainReactionForm',
    component: <ScopeChainReactionForm className={'formily-demos'} />,
    key: 'ScopeChainReactionForm',
  },
  {
    text: 'SiblingPathsForm',
    component: <SiblingPathsForm className={'formily-demos'} />,
    key: 'SiblingPathsForm',
  },
  {
    text: 'InteractiveModeForm',
    component: <InteractiveModeForm className={'custom-formily-demos'} />,
    key: 'InteractiveModeForm',
  },
  {
    text: 'FieldLifeCycleForm',
    component: <FieldLifeCycleForm className={'custom-formily-demos'} />,
    key: 'FieldLifeCycleForm',
  },
  {
    text: 'XtForm',
    component: <XtForm />,
    key: 'XtForm',
  },
];

const FormilyDemo = ({ dispatch, formDemo, loading }: any) => {
  //   const [liSelected, selectLi0] = useState(index);
  //   umiConsole.log('FormilyDemo #172 formDemo:', formDemo, 'loading:', loading);
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
      // selectLi0(index);
      //   umiConsole.log('selectLi #183 index:', index);
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
      <StyledSubPage>{options[liSelected]?.component}</StyledSubPage>
    </StyledDiv>
  );
};

export default connect(({ dispatch, formDemo, loading }: IFormDemo) => ({
  dispatch,
  formDemo,
  loading: loading.effects['formDemo/querySelectedIndex'],
}))(FormilyDemo);
