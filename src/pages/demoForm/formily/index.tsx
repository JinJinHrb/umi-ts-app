import React, { useRef, useState } from 'react';
import { connect } from 'umi';
import { QueryTableState, Loading } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLiOption, StyledSubPage } from './styled';
import { Typography } from 'antd';
import BasicForm from '@/pages/demoForm/formily/cases/basic';
import DetailsForm from '@/pages/demoForm/formily/cases/details';
import ValidatesForm from '@/pages/demoForm/formily/cases/validates';
import TraditionalControlledForm from '@/pages/demoForm/formily/cases/traditionalControlledForm';
import ResponsiveControlledForm from '@/pages/demoForm/formily/cases/responsiveControlledForm';
import SchemaControlledForm from '@/pages/demoForm/formily/cases/schemaControlledForm';
import ArrayItemsForm from '@/pages/demoForm/formily/cases/ArrayItems/json';
// import '@formily/antd/dist/antd.css';
import 'antd/dist/antd.css';
import './styles.less';

const { Text } = Typography;

const options = [
  {
    text: 'BasicForm',
    component: <BasicForm className={'formily-demos'} />,
    key: 'BasicForm',
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
    text: 'ArrayItemsForm',
    component: <ArrayItemsForm className={'formily-demos'} />,
    key: 'ArrayItemsForm',
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
