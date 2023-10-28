import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ProfilePre } from '../Presentational/ProfilePre';
import type { GetProfileAPIResponse } from '../types/GetProfileAPIResponse';

interface ProfileConProps {
  userId: string | string[] | undefined
}
export const ProfileCon: FC<ProfileConProps> = ({ userId: uid }) => {
  const [userId, setUserId] = useState<string>('');
  const [userInfo, setUserInfo] = useState<GetProfileAPIResponse>({} as GetProfileAPIResponse);
  console.log(userId);

  useEffect(() => {
    if (!!uid && typeof uid === 'string') {
      setUserId(uid);
    }
  }, [uid]);

  // APIからユーザー情報を取得
  const getUserInfo = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}?userId=${userId}`);
      const json = await res.json();
      const profile = json[0] as GetProfileAPIResponse;
      setUserInfo(profile);
      console.log('profile 取得成功', profile);
    }
    catch (err) {
      console.log('profile 取得失敗', err);
    }
  };

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  // follow数、follower数は とりあえず仮で1100, 100
  return <ProfilePre userInfo={userInfo} userFollowed={1100} userFollower={100} />;
};