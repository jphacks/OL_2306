import type { FC, ChangeEvent, FormEvent } from 'react';
import { SigninPre } from '../Presentational/SigninPre';
import { useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';

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

  const postData = {
    "email": formValues.email,
    "password": formValues.password
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios.post('/api/signin', postData);
      router.push('/');  
    } catch(e) {
      console.log(e)
    }
  }

  return <SigninPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />;
};