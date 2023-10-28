import { Box, Button, Heading } from '@chakra-ui/react';
import type { FC } from 'react';

// 関数と変数をPresentationalに渡すために型を記述する
interface SigninPreProps {
    count : number,
    handleClick : () => void
}

/**
 * Presentational（サインイン画面のUIを記述する）
 * @returns 
 */
export const SigninPre:FC<SigninPreProps> = ({ count, handleClick }) => {
  return <>
    <Heading>サインイン画面</Heading>
    <Box>
      <Box>カウント：{count}</Box>
      <Button onClick={handleClick}>クリック！！</Button>
    </Box>
  </>;
};