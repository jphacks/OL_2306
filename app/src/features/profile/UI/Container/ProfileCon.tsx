import type { FC} from 'react';
import { useEffect, useState } from 'react';
import { ProfilePre } from '../Presentational/ProfilePre';

interface ProfileConProps {
    userId: string | string[] | undefined
}
export const ProfileCon:FC<ProfileConProps> = ({userId: uid}) => {
  const [userId, setUserId] = useState<string>('');
  console.log(userId);

  useEffect(()=>{
    if (!!uid && typeof uid === 'string') {
      setUserId(uid);
    }
  },[uid]);
    
  return <ProfilePre userName="撮影者A" userFollowed={1000} userFollower={100}/>;
};