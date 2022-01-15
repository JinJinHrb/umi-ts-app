import React, { FC, useEffect } from 'react';
import { connect } from 'umi';
import { QueryTableState, Loading } from '@/models/connect';
import { StyledDiv, StyledUl, StyledLi, StyledSubPage } from './styled';
import AsyncSetForm from '@/pages/demoForm/hookForm/components/asyncSet';
import AsyncSubmitValidationForm from '@/pages/demoForm/hookForm/components/asyncSubmitValidation';
import { Typography } from 'antd';
const { Text } = Typography;

const HookForms = (
  {
    /* dispatch, queryTable, loading  */
  },
) => {
  return (
    <StyledDiv>
      <StyledUl>
        <StyledLi>
          <Text>Async Set Form Values</Text>
        </StyledLi>
        <StyledLi>
          <Text type="secondary">Ant Design (secondary)</Text>
        </StyledLi>
      </StyledUl>
      <StyledSubPage>
        {/* <AsyncSetForm /> */}
        <AsyncSubmitValidationForm />
      </StyledSubPage>
    </StyledDiv>
  );
};

export default connect(({ queryTable, loading }: { queryTable: QueryTableState; loading: Loading }) => ({
  queryTable,
  loading: loading.models.queryTable,
}))(HookForms);
