import type { FC } from 'react';
import { Flex, Stack, Box, Button, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { Layout } from '@/application/UI/Components/layout';
import Link from 'next/link';
import { FormValues } from '../Container/SigninCon';

// 関数と変数をPresentationalに渡すために型を記述する
interface SigninPreProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValues: FormValues;
}

/**
 * Presentational（サインイン画面のUIを記述する）
 * @returns 
 */
export const SigninPre:FC<SigninPreProps> = ({handleChange, handleSubmit, formValues}) => {
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={8}>
              <FormControl>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  name='email'
                  placeholder="メールアドレス"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>パスワード</FormLabel>
                <Input
                  type="password"
                  name='password'
                  placeholder="パスワード"
                  onChange={(e) => handleChange(e)}
                 />
              </FormControl>
              <Link href="/signup"><Text color="blue.400" p={1}>新規登録へ</Text></Link>
              <Button
                bg="blue.400"
                color="whiteAlpha.900"
                type="submit"
              >ログイン
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Layout>
  </>;
};