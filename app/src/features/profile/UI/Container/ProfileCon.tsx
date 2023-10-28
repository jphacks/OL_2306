import type { FC} from 'react';
import { useEffect, useState } from 'react';
import { ProfilePre } from '../Presentational/ProfilePre';
import type { UserType } from '@/application/types/UserType';

interface ProfileConProps {
    userId: string | string[] | undefined
}
export const ProfileCon:FC<ProfileConProps> = ({userId: uid}) => {
  const [userId, setUserId] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType);
  console.log(userId);

  useEffect(()=>{
    if (!!uid && typeof uid === 'string') {
      setUserId(uid);
    }
  }, [uid]);

  // APIからユーザー情報を取得
  const getUserInfo = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`);
      const data = await res.json();
      setUserInfo(data);
    }
    catch (err) {
      console.log("profile 取得失敗", err);
    }
  }

  useEffect(() => {
    getUserInfo(userId);
  }, []);
    
  // follow数、follower数は とりあえず仮で1000, 100
  return <ProfilePre userInfo={userInfo} userFollowed={1000} userFollower={100} />;
};