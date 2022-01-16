import styled from 'styled-components';

export const StyledLabel = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 13px;
  margin-top: 20px;
  color: white;
  font-size: 14px;
  font-weight: 200;
`;

export const StyledH1 = styled.h1`
  font-weight: 100;
  color: white;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(79, 98, 148);
`;

export const StyledP = styled.p`
  color: white;
  margin-bottom: 40px;
  &:before {
    display: inline;
    content: '⚠ ';
  }
`;

interface ISubmit {
  uploading?: boolean;
  onClick?: any;
}

const submitStyles = `
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 40px;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
  display: block;
  cursor: pointer;
`;

export const StyledSubmitInput = styled.input.attrs({ type: 'submit' })`
  background: ${(props: ISubmit) => (props.uploading ? '#d5adcc' : '#ec5990')};
  &:hover {
    background: #bf1650;
  }
  ${submitStyles}
`;

export const StyleInvalidSubmitButton = styled.button`
  background: #d5adcc;
  ${submitStyles};
`;

export const StyledNormalButton = styled.button.attrs({ type: 'button' })`
  display: block;
  appearance: none;
  background: #333;
  color: white;
  border: none;
  text-transform: uppercase;
  padding: 5px;
  border-radius: 4px;
`;

export const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 15rem;
  border-radius: 4px;
  border: 1px solid white;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const StyledCounterSpan = styled.span`
  font-weight: 400;
  background: white;
  color: black;
  padding: 10px 15px;
  border-radius: 4px;
  position: fixed;
  bottom: 60px;
  right: 80px;
`;
