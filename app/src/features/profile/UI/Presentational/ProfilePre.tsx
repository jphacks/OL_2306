import { Layout } from '@/application/UI/Components/layout';
import { Avatar, Box, Button, Center, Grid, GridItem, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { IconContext } from 'react-icons';
import { AiTwotoneSetting } from 'react-icons/ai';
import type { UserType } from '@/application/types/UserType';

interface ProfilePreProps {
  userInfo: UserType
    userFollower: number
    userFollowed: number
}
export const ProfilePre: FC<ProfilePreProps> = ({ userFollowed, userFollower, userInfo }) => {
  return <Layout title="フォトマ">
    <Box p={4}>
      <HStack justify='center' align='center'>
        <Box>
          <Avatar src="" name="avatar" size='xl' />
        </Box>
        <VStack>
          <HStack pl={9}>
            <Box w='100px'>
              <Text>{userInfo.userName}</Text>
            </Box>
            <HStack>
              <Button>フォローする</Button>
              <Button>メッセージ</Button>
            </HStack>
          </HStack>
          <HStack>
            <Box>
              <Text>撮影80件</Text>
            </Box>
            <Box>
              <Text>フォロワー{userFollower}人</Text>
            </Box>
            <Box>
              <Text>フォロー中{userFollowed}人</Text>
            </Box>
          </HStack>
        </VStack>
        <Box p={10}>
          <IconContext.Provider value={{ size: '2rem' }}>
            <IconButton
              aria-label="Settings"
              icon={
                <AiTwotoneSetting />
              }
            />
          </IconContext.Provider>
        </Box>
      </HStack>
      <Center py={4}>
        <Text>
          {userInfo.description}
        </Text>
      </Center>
      <Center flexDir='column' maxW='70vw' margin='auto'>
        <Box w='full' py={3}>
          <Text>過去の撮影写真</Text>
        </Box>
        <Grid gridTemplateColumns='repeat(5, 1fr)' gap={3}>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
          <GridItem>
            <Image src='/images/portfolios/01.png' />
          </GridItem>
        </Grid>
      </Center>
    </Box>
  </Layout>;
};