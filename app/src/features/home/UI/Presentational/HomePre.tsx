import { Layout } from '@/application/UI/Components/layout';
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
} from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';

interface HomePreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handlePost: (content: string, type: string) => void;
  content: string;
  setContent: (value: string) => void;
  type: 'tweet' | 'model' | 'camera';
  setType: (value: 'tweet' | 'model' | 'camera') => void;
  getLabelForType: (type: string) => string;
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
}) => {
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
                _hover={{ bg: 'gray.400' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
              >
                {getLabelForType(type)}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setType('tweet')}>つぶやき</MenuItem>
                <MenuItem onClick={() => setType('model')}>モデル募集</MenuItem>
                <MenuItem onClick={() => setType('camera')}>
                  撮影者募集
                </MenuItem>
              </MenuList>
            </Menu>
            <FormControl mt={4}>
              <Textarea
                value={content}
                border="none"
                placeholder="今何してる？"
                _placeholder={{ color: 'gray.400' }}
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
