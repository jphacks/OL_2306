import type { FC} from 'react';
import { useState } from 'react';
import type { GetProfileAPIResponse } from '../types/GetProfileAPIResponse';
import { Avatar, Box, Button, HStack, Input } from '@chakra-ui/react';
interface SettingFormProps {
    userId: string;
    userInfo: GetProfileAPIResponse;
    setUserInfo: (userInfo: GetProfileAPIResponse) => void;
    onClose: () => void;
}
export const SettingForm: FC<SettingFormProps> = ({ userId, userInfo, setUserInfo, onClose }) => {
  const [editedUserInfo, setEditedUserInfo] = useState<GetProfileAPIResponse>(userInfo);
  const onClickSaveButton = async () => {
    if (!editedUserInfo.user_name) {
      console.log('ユーザー名が空です');
      return;
    }
    console.log('修正結果を POST する', editedUserInfo);
    try {
      const url = `/api/user/${userId}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserInfo),
      });
      const json = await res.json();
      console.log('POST 成功', json);
      // 更新を反映する
      setUserInfo(editedUserInfo);
    }
    catch (err) {
      console.log('POST 失敗', err);
    }
    onClose();
  };

  return (
    <Box h='100%' w='100%' >
      <HStack justifyContent="space-around" p={5} h='20%'>
        <Box>
          <Avatar src="" name="avatar" size='xl' />
        </Box>

        <Box w='70%'>
          <Box textAlign='left' w='100%' pb={2}>
                        名前
          </Box>
          <Input
            defaultValue={userInfo.user_name}
            onChange={(e) => setEditedUserInfo({ ...editedUserInfo, user_name: e.target.value })}
          />
        </Box>
      </HStack>
      <Box w='100%' h='80%' className="description">
        {/* 左に寄せる */}
        <Box textAlign='left' w='100%' pb={2} >
                    自己紹介
        </Box>
        <Input
          as='textarea'
          h='80%'
          pb={5}
          defaultValue={userInfo.description}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, description: e.target.value })}
        />
        {/* 右に寄せる */}
        <Button float='right' onClick={onClickSaveButton}>
                    完了
        </Button>
      </Box>
    </Box >
  );
};