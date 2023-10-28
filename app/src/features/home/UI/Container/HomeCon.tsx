import { FC, useEffect } from "react";
import { useState } from "react";
import { HomePre } from "../Presentational/HomePre";

/**
 * Container（ホーム画面のロジックを記述する）
 * @returns
 */
export const HomeCon: FC = () => {
  const [timeline, setTimeline] = useState<Array<any>>([]);
  const [filteredType, setFilteredType] = useState<
    "tweet" | "model" | "camera"
  >("tweet");

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
      timeline={timeline}
      filteredType={filteredType}
      setFilteredType={setFilteredType}
    />
  );
};
