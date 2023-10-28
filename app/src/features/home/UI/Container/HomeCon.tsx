import type { FC} from 'react';
import { useState } from 'react';
import { HomePre } from '../Presentational/HomePre';

/**
 * Container（ホーム画面のロジックを記述する）
 * @returns 
 */
export const HomeCon:FC = () => {
  // 例：カウントアップのロジック
  // 変数
  const [count, setCount] = useState<number>(0);
  // 関数
  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  // 関数と変数をPresentationalに渡す
  return <HomePre count={count} handleClick={handleClick}/>;
};