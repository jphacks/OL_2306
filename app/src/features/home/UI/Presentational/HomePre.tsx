import { Layout } from "@/application/UI/Components/layout";
import { Box, Button, Heading } from "@chakra-ui/react";
import { FC, useState } from "react";

interface HomePreProps {
  timeline: Array<any>;
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
      <Heading>ホーム画面</Heading>
      <Box>
        <Button onClick={() => setFilteredType("tweet")}>つぶやき</Button>
        <Button onClick={() => setFilteredType("model")}>モデル募集</Button>
        <Button onClick={() => setFilteredType("camera")}>撮影者募集</Button>
      </Box>
      <Box>
        {filteredTimeline.map((item) => (
          <Box key={item.id}>
            <p>{item.user_id}</p>
            <p>{item.content}</p>
            <p>{item.post_date}</p>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};
