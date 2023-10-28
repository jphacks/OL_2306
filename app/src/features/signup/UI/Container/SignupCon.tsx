import { useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { SignupPre } from '../Presentational/SignupPre';

export interface FormValues {
  username: string,
  email: string,
  password: string,
}

/**
 * Container（サインイン画面のロジックを記述する）
 * @returns 
 */
export const SignupCon:FC = () => {
  const initialValues = { username: "", email: "", password: "" }
  const [formValues, setFormValues] = useState<FormValues>(initialValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formValues);
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "user_name": formValues.username,
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

  return <SignupPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />;
};