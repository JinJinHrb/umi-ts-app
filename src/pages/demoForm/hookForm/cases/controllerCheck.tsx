import React, { useState } from 'react';
import { useController, useForm, Control } from 'react-hook-form';
import Headers from './hfComponents/Header';

let renderCount = 0;

interface ICheckboxes {
  options: string[];
  control: Control<any>;
  name: string;
}

const Checkboxes = ({ options, control, name }: ICheckboxes) => {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = React.useState(field.value || []);

  return (
    <>
      {options.map((option, index) => (
        <input
          onChange={(e) => {
            const valueCopy = [...value];

            // update checkbox value
            valueCopy[index] = e.target.checked ? e.target.value : null;

            // send data to react hook form
            field.onChange(valueCopy);

            // update local state
            setValue(valueCopy);
          }}
          key={option}
          type="checkbox"
          checked={value.includes(option)}
          value={option}
        />
      ))}
    </>
  );
};

export default function App() {
  const [submitted, setSubmitted] = useState();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      controlled: ['a'],
      uncontrolled: ['A'],
    },
  });
  const onSubmit = (data: any) => setSubmitted(data);
  renderCount++;

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h2>uncontrolled</h2>
          <input {...register('uncontrolled')} type="checkbox" value="A" />
          <input {...register('uncontrolled')} type="checkbox" value="B" />
          <input {...register('uncontrolled')} type="checkbox" value="C" />
        </section>

        <section>
          <h2>controlled</h2>
          <Checkboxes options={['a', 'b', 'c']} control={control} name="controlled" />
        </section>
        <input type="submit" />
      </form>
      {submitted && (
        <div>
          Submitted Data:
          <br />
          {JSON.stringify(submitted)}
        </div>
      )}
    </div>
  );
}
