import { FC, useState } from "react";
import { HomePre } from "../Presentational/HomePre";

export const HomeCon: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <HomePre
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handlePost}
    />
  );
};

export default HomeCon;
