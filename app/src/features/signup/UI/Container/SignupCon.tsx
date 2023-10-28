import type { FC, ChangeEvent, FormEvent } from 'react';
import { SignupPre } from '../Presentational/SignupPre';
import { useState } from 'react';
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
      }).then(() => {
        router.push('/');  
      }).catch((error) => {
        console.log(error);
      })
  }

  return <SignupPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />;
};