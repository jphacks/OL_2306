import type { FC } from 'react';
import { Container, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

export const Form:FC = () => {
  return <>
    <Container>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type='email' />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </Container>
  </>;
};