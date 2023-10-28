import { Layout } from '@/application/UI/Components/layout';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';

interface HomePreProps {
  timeline: Array<{
    content: string;
    id: number;
    user_id: number;
    user_name: string;
    type: 'tweet' | 'model' | 'camera';
  }>;
  filteredType: 'tweet' | 'model' | 'camera';
  setFilteredType: (type: 'tweet' | 'model' | 'camera') => void;
}

export const HomePre: FC<HomePreProps> = ({
  timeline,
  filteredType,
  setFilteredType,
}) => {
  const filteredTimeline = timeline.filter(
    (item) => item.type === filteredType
  );

  return (
    <Layout title="フォトマ">
      <Box margin="20px 50px">
        <Flex justifyContent="flex-end" mt={10} mb={10}>
          <Text
            mr={8}
            ml={2}
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => setFilteredType('tweet')}
          >
            つぶやき
          </Text>
          <Text
            mr={8}
            ml={2}
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => setFilteredType('model')}
          >
            モデル募集
          </Text>
          <Text
            mr={2}
            ml={2}
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => setFilteredType('camera')}
          >
            撮影者募集
          </Text>
        </Flex>
        <Flex wrap="wrap" justify="flex-start">
          {filteredTimeline.map((item) => (
            <Box
              key={item.id}
              w="25%"
              p={4}
              boxShadow="sm"
              borderWidth="1px"
              borderRadius="5px"
            >
              <Box
                bg="gray.300"
                w="100%"
                h="150px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                画像
              </Box>
              <p>{item.user_name}</p>
              <p>{item.content}</p>
            </Box>
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};
