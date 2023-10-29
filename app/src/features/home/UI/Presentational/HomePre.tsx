import { Layout } from "@/application/UI/Components/layout";
import {
  Button,
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import type { FC } from "react";
import React from "react";

interface HomePreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handlePost: (content: string, type: string) => void;
  content: string;
  setContent: (value: string) => void;
  type: "tweet" | "model" | "camera";
  setType: (value: "tweet" | "model" | "camera") => void;
  getLabelForType: (type: string) => string;
  timeline: Array<{
    content: string;
    id: number;
    user_id: number;
    user_name: string;
    type: "tweet" | "model" | "camera";
  }>;
  filteredType: "tweet" | "model" | "camera";
  setFilteredType: (type: "tweet" | "model" | "camera") => void;
}

/**
 * Presentational（画面のUIを記述する）
 * @returns
 */
export const HomePre: FC<HomePreProps> = ({
  isOpen,
  onOpen,
  onClose,
  handlePost,
  content,
  setContent,
  type,
  setType,
  getLabelForType,
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
