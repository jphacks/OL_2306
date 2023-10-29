import type { FC, ChangeEvent, FormEvent } from 'react';
import { SigninPre } from '../Presentational/SigninPre';
import { useState } from 'react';
import { useRouter } from 'next/router';

export interface FormValues {
  email: string,
  password: string,
}

export interface FormErrors {
  email: string,
  password: string,
}

/**
 * Container（サインイン画面のロジックを記述する）
 * @returns 
 */
export const SigninCon:FC = () => {
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<FormErrors>({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values: FormValues) => {
    const errors: FormErrors = { email: '', password: '' };
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.email) {
      errors.email = 'メールアドレスを入力してください';
    } else if (!regex.test(values.email)) {
      errors.email = '正しいメールアドレスを入力してください';
    }
    if(!values.password) {
      errors.password = 'パスワードを入力してください';
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorCheck = validate(formValues);
    setFormErrors(errorCheck);
    if (errorCheck.email !== '' || errorCheck.password !== '' ) {
      return ;
    }
    try {
      const url = '/api/signin';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            'email': formValues.email,
            'password': formValues.password,
          }
        )
      };
      const res = await fetch(url, options);
      console.log(res);
      router.push('/'); 
    } catch(e) {
      console.log(e);
    }
  };

  return <SigninPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} formErrors={formErrors} />;
};