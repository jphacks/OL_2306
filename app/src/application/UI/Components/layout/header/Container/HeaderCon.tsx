import type { FC } from 'react';
import { HeaderPre } from '../Presentational/HeaderPre';
interface HeaderConProps {
    title: string
}
export const HeaderCon:FC<HeaderConProps> = ({title}) => {
  return <HeaderPre title={title}/>;
};