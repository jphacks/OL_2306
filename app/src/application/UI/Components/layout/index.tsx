import type { FC, ReactNode } from 'react';
import { HeaderCon } from './header/Container/HeaderCon';

interface Props {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <HeaderCon title={title}/>
      <main>{children}</main>
    </>
  );
};