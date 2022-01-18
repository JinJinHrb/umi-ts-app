import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import { Input as StrapInput } from 'reactstrap';
import { Input } from 'antd';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const MyInput = React.forwardRef(({ name, label, ...rest }, ref) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
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
  });
  const onSubmit = (data) => {
    setSubmitted(data);
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField {...register('muiInput')} placeholder="mui/textfield" />
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
          <label className="reactSelectLabel">React select</label>

          <Controller
            name="filters"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  className="reactSelect"
                  name="filters"
                  placeholder="Filters"
                  options={options}
                  isMulti
                  {...field}
                />
              );
            }}
          />
        </div>

        <div>
          <MyInput name="firstName" label="First Name" {...register('firstName')} />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input placeholder="Luo" {...register('lastName')} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input placeholder="bluebill1049@hotmail.com" type="email" {...register('email')} />
        </div>
        <button type="submit">Submit</button>
        {submitted && (
          <div>
            Submitted Data:
            <br />
            {JSON.stringify(submitted)}
          </div>
        )}
      </form>
    </div>
  );
}
