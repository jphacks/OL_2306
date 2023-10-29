import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { headerStyle } from './HeaderPre.css';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IconContext } from 'react-icons';
interface HeaderPreProps {
  title: string
}

export const HeaderPre: FC<HeaderPreProps> = ({ title }) => {
  return <>
    <Flex as='header' css={headerStyle}>
      <Heading>
        <Text as='a' href="/" fontFamily="logo" fontSize='2rem' fontWeight='bold' color='black'>
          {title}
        </Text>
      </Heading>
      <Flex flex={2} justify='end' gap={4}>
        <>
          <Link href='/' color="black">
            <IconContext.Provider value={{ size: '2rem' }}>
              <AiOutlineMail />
            </IconContext.Provider>
          </Link>
          <Link href='/' color="black">
            <IconContext.Provider value={{ size: '2rem' }}>
              <IoIosNotificationsOutline />
            </IconContext.Provider>
          </Link>
          <Link href='/' color="black">
            <IconContext.Provider value={{ size: '2rem' }}>
              <BiSolidUserCircle />
            </IconContext.Provider>
          </Link>
        </>
      </Flex>
    </Flex>
  </>;
};