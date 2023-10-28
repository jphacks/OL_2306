import { Layout } from "@/application/UI/Components/layout";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
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
            <FormControl w="40%">
              <Select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "tweet" | "model" | "camera")
                }
                borderRadius="40px"
                borderColor="black"
              >
                <option value="tweet">つぶやき</option>
                <option value="model">モデル募集</option>
                <option value="camera">撮影者募集</option>
              </Select>
            </FormControl>

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
          <Button mt={4} onClick={handlePost}>
            送信
          </Button>
        </ModalContent>
      </Modal>
    </Layout>
  );
};
