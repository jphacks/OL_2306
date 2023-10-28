import type { FC } from 'react';
import { Flex, Stack, Box, Button, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { Layout } from '@/application/UI/Components/layout';
import Link from 'next/link';

// 関数と変数をPresentationalに渡すために型を記述する
interface SigninPreProps {
}

/**
 * Presentational（サインイン画面のUIを記述する）
 * @returns 
 */
export const SigninPre:FC<SigninPreProps> = ({}) => {
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
          <Stack spacing={8}>
            <FormControl>
              <FormLabel>ユーザー名</FormLabel>
              <Input type="text" placeholder="ユーザー名" />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input type="password" placeholder="パスワード" />
            </FormControl>
            <Link href="/signup"><Text color="blue.400" p={1}>新規登録へ</Text></Link>
            <Button
              bg="blue.400"
              color="whiteAlpha.900"
              type="submit"
            >ログイン
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  </>;
};