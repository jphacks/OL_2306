import { ChakraProvider } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

interface props {
    children: ReactNode
}
export const AppProvider:FC<props> = ({children}) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};