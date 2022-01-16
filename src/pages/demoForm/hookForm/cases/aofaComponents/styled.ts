import styled from 'styled-components';
const sectionCss = `
    // display: grid;
    // grid-template-columns: 1fr 120px;
    // grid-gap: 20px;
    margin-bottom: 20px;
`;
export const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;
export const StyledSection = styled.section`${sectionCss}`;
export const StyledLi = styled.li`${sectionCss}`;

export const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledRowFlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledSpace = styled.div`
  margin: 15px;
`;

export const StyledHr = styled.hr`
  margin-top: 30px;
  border: none;
  border-bottom: 1px solid rgb(79, 98, 148);
`;
