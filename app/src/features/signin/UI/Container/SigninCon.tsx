import type { FC, ChangeEvent, FormEvent } from 'react';
import { SigninPre } from '../Presentational/SigninPre';
import { useState } from 'react';

export interface FormValues {
  email: string,
  password: string,
}

/**
 * Container（サインイン画面のロジックを記述する）
 * @returns 
 */
export const SigninCon:FC = () => {
  const initialValues = { email: "", password: "" }
  const [formValues, setFormValues] = useState<FormValues>(initialValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "email": formValues.email,
          "password": formValues.password,
        }
      )
    }).then((res) => {
      console.log(res);
      res.json().then((json) => {
        console.log(json);
      })
    }).catch((error) => {
      console.log(error);
    })
  }
  return <SigninPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />;
};