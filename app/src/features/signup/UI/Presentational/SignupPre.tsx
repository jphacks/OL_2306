import type { FC } from 'react';
import { Flex, Stack, Box, Button, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { Layout } from '@/application/UI/Components/layout';
import Link from 'next/link';
import { FormErrors, FormValues } from '../Container/SignupCon';

// 関数と変数をPresentationalに渡すために型を記述する
interface SignupPreProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValues: FormValues;
  formErrors: FormErrors;
}

/**
 * Presentational（サインアップ画面のUIを記述する）
 * @returns 
 */
export const SignupPre:FC<SignupPreProps> = ({ handleChange,  handleSubmit, formValues, formErrors }) => {
  
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
                <FormLabel>ユーザー名</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="ユーザー名"
                  onChange={(e) => handleChange(e)} 
                  value={formValues.username}
                />

                <Box>
                  <Text color="red" as="b">{formErrors.username}</Text>
                </Box>
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
                <Box>
                  <Text color="red" as="b">{formErrors.email}</Text>
                </Box>
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
                <Box>
                  <Text color="red" as="b">{formErrors.password}</Text>
                </Box>
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