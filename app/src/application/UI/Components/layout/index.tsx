import type { FC, ReactNode } from 'react';

interface Props {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <main style={{height:'calc(100svh - 143.9px)'}}>{children}</main>
    </>
  );
};