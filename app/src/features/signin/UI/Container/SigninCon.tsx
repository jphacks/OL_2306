import type { FC, ChangeEvent, FormEvent } from 'react';
import { SigninPre } from '../Presentational/SigninPre';
import { useState } from 'react';
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    }).then(() => {
      router.push('/');  
    }).catch((error) => {
      console.log(error);
    })
  }
  return <SigninPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />;
};