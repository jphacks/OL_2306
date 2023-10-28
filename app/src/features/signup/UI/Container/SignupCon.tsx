import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
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
  return <SignupPre handleChange={handleChange} formValues={formValues} />;
};