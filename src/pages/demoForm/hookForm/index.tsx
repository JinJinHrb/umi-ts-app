import React, { FC, useEffect } from 'react';
import { connect } from 'umi';
import { QueryTableState, Loading } from '@/models/connect';
import { StyledDiv, StyledUl, StyledSubPage } from './styled';
import AsyncSetForm from '@/pages/demoForm/hookForm/components/asyncSet';

const HookForms = (
  {
    /* dispatch, queryTable, loading  */
  },
) => {
  return (
    <StyledDiv>
      <StyledUl>
        <li>asyncSetFormValues</li>
      </StyledUl>
      <StyledSubPage>
        <AsyncSetForm />
      </StyledSubPage>
    </StyledDiv>
  );
};

export default connect(({ queryTable, loading }: { queryTable: QueryTableState; loading: Loading }) => ({
  queryTable,
  loading: loading.models.queryTable,
}))(HookForms);
