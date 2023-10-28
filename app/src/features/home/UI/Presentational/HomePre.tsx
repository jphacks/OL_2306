import { Layout } from "@/application/UI/Components/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface HomePreProps {
  count: number;
  handleClick: () => void;
}

/**
 * Presentational（画面のUIを記述する）
 * @returns
 */
export const HomePre: FC<HomePreProps> = ({ count, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState<"tweet" | "model" | "camera">("tweet");

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
    setType("tweet");
  };
  const handleOpen = () => setIsOpen(true);
  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <Layout title="フォトマ">
      <Button position="fixed" right="1rem" bottom="1rem" onClick={handleOpen}>
        +
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>タイプ</FormLabel>
              <Select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "tweet" | "model" | "camera")
                }
              >
                <option value="tweet">つぶやき</option>
                <option value="model">モデル募集</option>
                <option value="camera">撮影者募集</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>内容</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};
