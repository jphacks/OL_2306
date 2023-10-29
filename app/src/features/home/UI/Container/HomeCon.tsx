import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HomePre } from "../Presentational/HomePre";

/**
 * Container（ホーム画面のロジックを記述する）
 * @returns
 */

type TweetType = {
  content: string;
  id: number;
  user_id: number;
  user_name: string;
  type: "tweet" | "model" | "camera";
};

export const HomeCon: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState<"tweet" | "model" | "camera">("tweet");
  const [timeline, setTimeline] = useState<Array<TweetType>>([]);
  const [filteredType, setFilteredType] = useState<TweetType["type"]>("tweet");

  const onClose = () => {
    setIsOpen(false);
    setType("tweet");
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handlePost = async (content: string, type: string) => {
    try {
      const response = await fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "2", content, type }), // userIdは仮
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Posted successfully:", data);
      } else {
        console.error("Error posting tweet:", data.message);
      }

      onClose();
      setContent("");
      setType("tweet");
    } catch (error) {
      console.error("An error occurred:", error);
    }
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

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const response = await fetch("/api/timeline");
        const data = await response.json();
        if (response.ok && data.tweets && Array.isArray(data.tweets)) {
          setTimeline(data.tweets);
        } else {
          console.error("API did not return the expected format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch timeline:", error);
      }
    }

    fetchTimeline();
  }, []);

  return (
    <HomePre
      isOpen={isOpen}
      handlePost={handlePost}
      content={content}
      setContent={setContent}
      type={type}
      setType={setType}
      getLabelForType={getLabelForType}
      onOpen={onOpen}
      onClose={onClose}
      timeline={timeline}
      filteredType={filteredType}
      setFilteredType={setFilteredType}
    />
  );
};

export default HomeCon;
