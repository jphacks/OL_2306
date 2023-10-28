import { Layout } from "@/application/UI/Components/layout";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";

interface HomePreProps {
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
      <Box margin="20px">
        <Box mb={4}>
          <Button onClick={() => setFilteredType("tweet")} ml={2}>
            つぶやき
          </Button>
          <Button onClick={() => setFilteredType("model")} ml={2}>
            モデル募集
          </Button>
          <Button onClick={() => setFilteredType("camera")} ml={2}>
            撮影者募集
          </Button>
        </Box>
        <Flex wrap="wrap" justify="space-between">
          {filteredTimeline.map((item) => (
            <Box
              key={item.id}
              w="calc(25% - 1rem)"
              mb={4}
              p={4}
              boxShadow="sm"
              borderWidth="1px"
              borderRadius="lg"
            >
              <p>{item.user_name}</p>
              <p>{item.content}</p>
            </Box>
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};
