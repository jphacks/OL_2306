import type { FC} from 'react';
import { useState } from 'react';
import { HomePre } from '../Presentational/HomePre';

export const HomeCon: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState<'tweet' | 'model' | 'camera'>('tweet');

  const onClose = () => {
    setIsOpen(false);
    setType('tweet');
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handlePost = async (content: string, type: string) => {
    try {
      const response = await fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: '2', content, type }), // userIdは仮
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Posted successfully:', data);
      } else {
        console.error('Error posting tweet:', data.message);
      }

      onClose();
      setContent('');
      setType('tweet');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  //typeを日本語に変換するヘルパー関数
  const getLabelForType = (type: string) => {
    switch (type) {
      case 'tweet':
        return 'つぶやき';
      case 'model':
        return 'モデル募集';
      case 'camera':
        return '撮影者募集';
      default:
        return type;
    }
  };

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
    />
  );
};

export default HomeCon;
