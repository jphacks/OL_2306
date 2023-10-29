import { Layout } from '@/application/UI/Components/layout';
import { Box, Button, Heading } from '@chakra-ui/react';
import type { FC } from 'react';

// 関数と変数をPresentationalに渡すために型を記述する
interface HomePreProps {
    count : number,
    handleClick : () => void
}

/**
 * Presentational（画面のUIを記述する）
 * @returns 
 */
export const HomePre:FC<HomePreProps> = ({ count, handleClick }) => {
  return <Layout title='フォトマ'>
    <Heading>ホーム画面</Heading>
    <Box>
      <Box>カウント：{count}</Box>
      <Button onClick={handleClick}>クリック！！</Button>
    </Box>
  </Layout>;
};