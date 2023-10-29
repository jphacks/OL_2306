import { Layout } from "@/application/UI/Components/layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { FC } from "react";
import React from "react";

type ContentType = "tweet" | "model" | "camera";

type TweetType = {
  content: string;
  id: number;
  user_id: number;
  user_name: string;
  type: "tweet" | "model" | "camera";
};

interface HomePreProps {
  isOpen: boolean;
  content: string;
  type: ContentType;
  filteredTimeline: TweetType[];
  onOpen: () => void;
  onClose: () => void;
  handlePost: (content: string, type: string) => void;
  setContent: (value: string) => void;
  setType: (value: ContentType) => void;
  getLabelForType: (type: string) => string;
  setFilteredType: (type: ContentType) => void;
}

/**
 * Presentational（画面のUIを記述する）
 * @returns
 */
export const HomePre: FC<HomePreProps> = ({
  isOpen,
  content,
  type,
  filteredTimeline,
  onOpen,
  onClose,
  handlePost,
  setContent,
  setType,
  getLabelForType,
  setFilteredType,
}) => {
  return (
    <Layout title="フォトマ">
      <Box margin="20px 50px">
        <Flex justifyContent="flex-end" mt={10} mb={10}>
          <Text
            mr={8}
            ml={2}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => setFilteredType("tweet")}
          >
            つぶやき
          </Text>
          <Text
            mr={8}
            ml={2}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => setFilteredType("model")}
          >
            モデル募集
          </Text>
          <Text
            mr={2}
            ml={2}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => setFilteredType("camera")}
          >
            撮影者募集
          </Text>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {filteredTimeline.map((item) => (
            <Box
              key={item.id}
              w="100%"
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
        </Grid>
      </Box>

      <Button position="fixed" right="1rem" bottom="1rem" onClick={onOpen}>
        +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                {getLabelForType(type)}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setType("tweet")}>つぶやき</MenuItem>
                <MenuItem onClick={() => setType("model")}>モデル募集</MenuItem>
                <MenuItem onClick={() => setType("camera")}>
                  撮影者募集
                </MenuItem>
              </MenuList>
            </Menu>
            <FormControl mt={4}>
              <Textarea
                value={content}
                border="none"
                placeholder="今何してる？"
                _placeholder={{ color: "gray.400" }}
                resize="vertical"
                fontSize="20px"
                h="200px"
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Button
            mt={4}
            w="20%"
            ml="auto"
            mr="10px"
            mb="10px"
            onClick={() => handlePost(content, type)}
          >
            投稿
          </Button>
        </ModalContent>
      </Modal>
    </Layout>
  );
};
