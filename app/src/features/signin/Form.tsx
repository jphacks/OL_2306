import type { FC } from 'react';
import { Container, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { Layout } from '@/application/UI/Components/layout';

export const Form:FC = () => {
  return <>
    <Layout title="フォトマ">
      <Container>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </Container>
    </Layout>
  </>;
};