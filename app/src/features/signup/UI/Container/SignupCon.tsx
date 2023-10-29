import type { FC, ChangeEvent, FormEvent } from 'react';
import { SignupPre } from '../Presentational/SignupPre';
import { useState } from 'react';
import { useRouter } from 'next/router';

export interface FormValues {
  username: string,
  email: string,
  password: string,
}
export interface FormErrors {
  username: string,
  email: string,
  password: string,
}

/**
 * Container（サインイン画面のロジックを記述する）
 * @returns 
 */

export const SignupCon:FC = () => {
  const initialValues = { username: '', email: '', password: '' };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<FormErrors>({ username: '', email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const postData = {
    'user_name': formValues.username,
    'email': formValues.email,
    'password': formValues.password
  };

  const validate = (values: FormValues) => {
    const errors: FormErrors = { username: '', email: '', password: '' };
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.username) {
      errors.username = 'ユーザー名を入力してください';
    }
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
    if (errorCheck.username !== '' || errorCheck.email !== '' || errorCheck.password !== '' ) {
      return ;
    }
    try {
      const url = '/api/signup';
      const options = {
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
      };
      const res = await fetch(url, options);
      console.log(res);
      router.push('/'); 
    } catch(e) {
      console.log(e);
    }
  };

  return <SignupPre handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} formErrors={formErrors} />;
};