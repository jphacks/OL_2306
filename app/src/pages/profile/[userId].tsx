import { ProfileCon } from '@/features/profile/UI/Container/ProfileCon';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home:NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  // userIdとセッションで本人か確認する必要あり
  return <ProfileCon userId={userId}/>;
};

export default Home;