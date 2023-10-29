import { Layout } from "@/application/UI/Components/layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
  image_path: string;
};

interface HomePreProps {
  isOpen: boolean;
  content: string;
  type: ContentType;
  filteredTimeline: TweetType[];
  imagePath: string;
  setImagePath: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
  handlePost: (content: string, type: string, imagePath: string) => void;
  setContent: (value: string) => void;
  setType: (value: ContentType) => void;
  getLabelForType: (type: string) => string;
  setFilteredType: (type: ContentType) => void;
  isDetailModalOpen: boolean;
  selectedItem: TweetType | null;
  openDetailModal: (item: TweetType) => void;
  closeDetailModal: () => void;
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
  imagePath,
  setImagePath,
  onOpen,
  onClose,
  handlePost,
  setContent,
  setType,
  getLabelForType,
  setFilteredType,
  isDetailModalOpen,
  selectedItem,
  openDetailModal,
  closeDetailModal,
}) => {
  return (
    <Layout title="フォトマ">
      <Box {...styles.home}>
        <Flex justifyContent="flex-end" mt={10} mb={10}>
          <Text {...styles.menu} onClick={() => setFilteredType("tweet")}>
            つぶやき
          </Text>
          <Text {...styles.menu} onClick={() => setFilteredType("model")}>
            モデル募集
          </Text>
          <Text {...styles.menu} onClick={() => setFilteredType("camera")}>
            撮影者募集
          </Text>
        </Flex>
        <Grid {...styles.gridContainer}>
          {filteredTimeline.map((item) => (
            <Box
              key={item.id}
              {...styles.card}
              onClick={() => openDetailModal(item)}
            >
              <Box {...styles.cardImage}>
                {item.image_path && (
                  <img src={item.image_path} alt="投稿画像" {...styles.image} />
                )}
              </Box>
              <p>{item.user_name}</p>
              <p>{item.content}</p>
            </Box>
          ))}
        </Grid>
      </Box>

      <Button {...styles.addButton} onClick={onOpen}>
        +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Menu>
              <MenuButton {...styles.ModalButton}>
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
                {...styles.ModalText}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Flex {...styles.ModalContainer}>
            <FormControl {...styles.ModalUrl}>
              <Input
                value={imagePath}
                placeholder="画像のURL"
                onChange={(e) => setImagePath(e.target.value)}
              />
            </FormControl>
            <Button
              {...styles.ModalSubmitButton}
              isDisabled={content.trim().length === 0}
              onClick={() => handlePost(content, type, imagePath)}
            >
              投稿
            </Button>
          </Flex>
        </ModalContent>
      </Modal>

      {/* 詳細モーダル */}
      <Modal isOpen={isDetailModalOpen} onClose={closeDetailModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedItem && (
              <>
                <img
                  src={selectedItem.image_path}
                  alt="投稿画像"
                  style={{
                    marginTop: "40px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  {selectedItem.user_name}
                </p>
                <p style={{ marginTop: "8px", marginBottom: "10px" }}>
                  {selectedItem.content}
                </p>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

const styles = {
  home: {
    margin: ["10px 25px", "15px 35px", "20px 50px"], // sm で "10px 25px"、md で "15px 35px"、lg で "20px 50px"
  },
  gridContainer: {
    templateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"], // sm で 2 列、md で 3 列、lg 以降で 4 列
    gap: 4,
  },
  menu: {
    mr: 8,
    ml: 2,
    cursor: "pointer",
    _hover: { textDecoration: "underline" },
  },
  card: {
    w: "100%",
    p: 4,
    boxShadow: "sm",
    borderWidth: "1px",
    borderRadius: "5px",
  },
  cardImage: {
    bg: "gray.300",
    w: "100%",
    h: ["60px", "120px", "150px"], // sm で 100px、md で 120px、lg で 150px
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    style: {
      width: "auto",
      height: "100%",
      objectFit: "contain" as const,
    },
  },
  addButton: {
    position: "fixed" as const,
    width: "50px",
    height: "50px",
    right: "50px",
    bottom: "50px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "1px solid gray",
    _hover: {
      backgroundColor: "gray.100",
    },
  },
  ModalButton: {
    px: 4,
    py: 2,
    transition: "all 0.2s",
    borderRadius: "md",
    borderWidth: "1px",
    _hover: { bg: "gray.400" },
    _expanded: { bg: "blue.400" },
    _focus: { boxShadow: "outline" },
  },
  ModalText: {
    border: "none",
    placeholder: "今何してる？",
    _placeholde: { color: "gray.400" },
    resize: "vertical" as const,
    fontSize: "20px",
    h: "200px",
  },
  ModalContainer: {
    mt: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ModalUrl: {
    flex: "1",
    ml: 4,
    mb: "10px",
    mt: 4,
  },
  ModalSubmitButton: {
    w: "20%",
    mt: 4,
    ml: 4,
    mr: "10px",
    mb: "10px",
  },
  detailModaltext: {
    mt: "20px",
    mb: "20px",
  },
};
