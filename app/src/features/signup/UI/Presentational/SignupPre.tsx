import type { ChangeEvent, FC } from 'react';
import { Flex, Stack, Box, Button, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import { Layout } from '@/application/UI/Components/layout';
import Link from 'next/link';
import { FormValues } from '../Container/SignupCon';

// 関数と変数をPresentationalに渡すために型を記述する
interface SignupPreProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  formValues: FormValues
}

/**
 * Presentational（サインアップ画面のUIを記述する）
 * @returns 
 */
export const SignupPre:FC<SignupPreProps> = ({ handleChange, formValues }) => {
  
  return <>
    <Layout title="フォトマ">
      <Flex
        minH="100vh"
        align="center"
        justify="center"
      >
        <Box rounded="lg"
          boxShadow="outline"
          p={10}
          w={600}
        >
          <form onSubmit={(e) => {
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
          }}>
            <Stack spacing={8}>
              <FormControl>
                <FormLabel>ユーザー名</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="ユーザー名"
                  onChange={(e) => handleChange(e)} 
                  value={formValues.username}
                />
              </FormControl>
              <FormControl>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="メールアドレス"
                  onChange={(e) => handleChange(e)}
                  value={formValues.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>パスワード</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="パスワード"
                  onChange={(e) => handleChange(e)}
                  value={formValues.password}
                 />
              </FormControl>
              <Link href="/signin"><Text color="blue.400" p={1}>ログインへ</Text></Link>
              <Button
                bg="blue.400"
                color="whiteAlpha.900"
                type="submit"
              >新規登録
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Layout>
  </>;
};