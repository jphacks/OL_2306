import type { FC} from 'react';
import { useState } from 'react';
import { SigninPre } from '../Presentational/SigninPre';

/**
 * Container（サインイン画面のロジックを記述する）
 * @returns 
 */
export const SigninCon:FC = () => {
  // 例：カウントアップのロジック
  // 変数
  const [count, setCount] = useState<number>(0);
  // 関数
  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  // 関数と変数をPresentationalに渡す
  return <SigninPre count={count} handleClick={handleClick}/>;
};