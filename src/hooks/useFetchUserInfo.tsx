import useUserStore from '@/store/user';
import { useState, useEffect } from 'react';

const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const { getUser } = useUserStore();

  useEffect(() => {
    const qyBearerToken = localStorage.getItem('qyBearerToken');
    if (qyBearerToken) {
      getUser().then((data) => {
        console.log(data);

        if (data.isRefresh) {
          setUserInfo(data.user);
        }
      });
    }
  }, []);

  return userInfo;
};

export default useFetchUserInfo;
