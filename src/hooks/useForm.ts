import { ChangeEvent, useState } from "react";

interface T extends Object {}

export interface IUseForm {
  // initialState: <T extends Object>(data: T) => {};
  initialState: T;
}

export interface IChangeForm {
  name: string;
  value: string;
}

// export const useForm = <T extends Object>(initialState: T) => {
export const useForm = ({ initialState }: IUseForm) => {
  const [formValues, setFormValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setFormValues(newFormState);
  };

  const handleChange = ({ name = "", value = "" }: IChangeForm) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return {
    formValues,
    handleChange,
    reset,
  };
};
