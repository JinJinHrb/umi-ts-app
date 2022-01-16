import React, { useRef, useState } from 'react';
import { connect } from 'umi';
import { QueryTableState, Loading } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLiOption, StyledSubPage } from './styled';
import AsyncSetValueForm from '@/pages/demoForm/hookForm/cases/asyncSetValue';
import AsyncSubmitValidationForm from '@/pages/demoForm/hookForm/cases/asyncSubmitValidation';
import AsyncFieldValidationForm from '@/pages/demoForm/hookForm/cases/asyncFieldValidation';
import ArrayOfFieldArrayForm from '@/pages/demoForm/hookForm/cases/arrayOfFieldArray';

import { Typography } from 'antd';
const { Text } = Typography;

const options = [
  {
    text: 'Async Set Form Values',
    component: <AsyncSetValueForm />,
    key: 'asyncSetValue',
  },
  {
    text: 'Async Submit Validation Form',
    component: <AsyncSubmitValidationForm />,
    key: 'asyncSubmitValidation',
  },
  {
    text: 'Async Field Validation Form',
    component: <AsyncFieldValidationForm />,
    key: 'asyncFieldValidation',
  },
  {
    text: 'Array of Field Array',
    component: <ArrayOfFieldArrayForm />,
    key: 'arrayOfFieldArray',
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
