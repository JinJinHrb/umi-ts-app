import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import { Input as StrapInput } from 'reactstrap';
import { Input } from 'antd';
import { StyledLabel, StyledH1, StyledSubmitInput, StyledP, StyledLightTextField } from './styled';
import { StyledSpace } from './aofaComponents/styled';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const MyInput = React.forwardRef((props: any, ref) => {
  const { name, label, ...rest } = props;
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <input name={name} placeholder="Jane" {...rest} ref={ref} />
    </>
  );
});

export default function App() {
  const [submitted, setSubmitted] = useState();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ant: '',
      strap: '',
      filters: [],
    },
  } as any);
  const onSubmit = (data: any) => {
    setSubmitted(data);
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <StyledLightTextField {...register('muiInput')} placeholder="mui/textfield" />
        </div>

        <div>
          <Controller
            name="ant"
            control={control}
            render={({ field }) => {
              return <Input {...field} />;
            }}
          />
        </div>

        <StyledSpace />

        <div>
          <Controller
            name="strap"
            control={control}
            render={({ field }) => {
              return <StrapInput {...field} />;
            }}
          />
        </div>

        <div>
          <StyledLabel className="reactSelectLabel">React select</StyledLabel>

          <Controller
            name="filters"
            control={control}
            render={({ field }) => {
              return <Select className="reactSelect" placeholder="Filters" options={options} isMulti {...field} />;
            }}
          />
        </div>

        <div>
          <MyInput label={'First Name'} {...register('firstName')} />
        </div>

        <div>
          <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
          <input placeholder="Luo" {...register('lastName')} />
        </div>

        <div>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <input placeholder="bluebill1049@hotmail.com" type="email" {...register('email')} />
        </div>

        <StyledSpace />

        {/* <button type="submit">Submit</button> */}

        <StyledSubmitInput />

        {submitted && (
          <StyledP>
            Submitted Data:
            <br />
            {JSON.stringify(submitted)}
          </StyledP>
        )}
      </form>
    </div>
  );
}
