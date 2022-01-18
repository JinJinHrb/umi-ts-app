import { useFieldArray, Control, FieldValues } from 'react-hook-form';

export type TNestedFieldArray = Partial<IFieldArray> & {
  register: Function;
};

export interface IFieldArray {
  nestIndex?: number;
  control?: Control<FieldValues, object>;
  register: Function;
  setValue: Function;
  getValues: Function;
  [k: string]: any;
}
