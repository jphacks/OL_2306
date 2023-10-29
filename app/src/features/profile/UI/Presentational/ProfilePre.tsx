import { Layout } from '@/application/UI/Components/layout';
import { Avatar, Box, Button, Center, Grid, GridItem, HStack, Image, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import type { GetProfileAPIResponse } from '../../types/GetProfileAPIResponse';
import { SettingModal } from '../../Components/EditModal';

interface ProfilePreProps {
  userId: string
  userInfo: GetProfileAPIResponse
  userFollower: number
  userFollowed: number
  setUserInfo: (userInfo: GetProfileAPIResponse) => void
}
export const ProfilePre: FC<ProfilePreProps> = ({ userId, userInfo, userFollower, userFollowed, setUserInfo }) => {
  return <Layout title="フォトマ">
    <Box p={4}>
      <HStack justify='center' align='center'>
        <Box>
          <Avatar src="" name="avatar" size='xl' />
        </Box>
        <VStack>
          <HStack pl={9}>
            <Box w='100px'>
              <Text>{userInfo.user_name}</Text>
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
        <SettingModal userId={userId} userInfo={userInfo} setUserInfo={setUserInfo} />
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