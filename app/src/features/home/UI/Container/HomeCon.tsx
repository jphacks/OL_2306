import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { HomePre } from '../Presentational/HomePre';

/**
 * Container（ホーム画面のロジックを記述する）
 * @returns
 */

type TweetType = {
  content: string;
  id: number;
  user_id: number;
  user_name: string;
  type: 'tweet' | 'model' | 'camera';
};

export const HomeCon: FC = () => {
  const [timeline, setTimeline] = useState<Array<TweetType>>([]);
  const [filteredType, setFilteredType] = useState<TweetType['type']>('tweet');

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const response = await fetch('/api/timeline');
        const data = await response.json();
        if (response.ok && data.tweets && Array.isArray(data.tweets)) {
          setTimeline(data.tweets);
        } else {
          console.error('API did not return the expected format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
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
