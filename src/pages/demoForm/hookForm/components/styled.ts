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

interface ISubmit {
  uploading?: boolean;
}

export const StyledInput = styled.input.attrs({ type: 'submit' })`
  color: white;
  background: ${(props: ISubmit) => (props.uploading ? '#d5adcc' : '#ec5990')};
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

// button[type="submit"],
// input[type="submit"] {
//   background: #ec5990;
//   color: white;
//   text-transform: uppercase;
//   border: none;
//   margin-top: 40px;
//   padding: 20px;
//   font-size: 16px;
//   font-weight: 100;
//   letter-spacing: 10px;
// }

// button[type="submit"]:hover,
// input[type="submit"]:hover {
//   background: #bf1650;
// }

// button[type="submit"]:active,
// input[type="button"]:active,
// input[type="submit"]:active {
//   transition: 0.3s all;
//   transform: translateY(3px);
//   border: 1px solid transparent;
//   opacity: 0.8;
// }

// input:disabled {
//   opacity: 0.4;
// }

// input[type="button"]:hover {
//   transition: 0.3s all;
// }

// button[type="submit"],
// input[type="button"],
// input[type="submit"] {
//   -webkit-appearance: none;
// }
