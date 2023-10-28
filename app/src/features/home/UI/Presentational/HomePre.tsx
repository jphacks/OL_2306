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
import React, { FC, useState } from "react";

interface HomePreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (content: string, type: string) => void;
}

/**
 * Presentational（画面のUIを記述する）
 * @returns
 */
export const HomePre: FC<HomePreProps> = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
}) => {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"tweet" | "model" | "camera">("tweet");

  const handlePost = () => {
    onSubmit(content, type);
    setContent("");
    setType("tweet");
  };

  //typeを日本語に変換するヘルパー関数
  const getLabelForType = (type: string) => {
    switch (type) {
      case "tweet":
        return "つぶやき";
      case "model":
        return "モデル募集";
      case "camera":
        return "撮影者募集";
      default:
        return type;
    }
  };

  return (
    <Layout title="フォトマ">
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
                onChange={(e) => setContent(e.target.value)}
                border="none"
                placeholder="今何してる？"
                _placeholder={{ color: "gray.400" }}
                resize="vertical"
                fontSize="20px"
                h="200px"
              />
            </FormControl>
          </ModalBody>
          <Button
            mt={4}
            onClick={handlePost}
            w="20%"
            ml="auto"
            mr="10px"
            mb="10px"
          >
            投稿
          </Button>
        </ModalContent>
      </Modal>
    </Layout>
  );
};
