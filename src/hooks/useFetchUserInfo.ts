import useUserStore from '@/store/user';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { clearUserToken } from '@/utils/common';
const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const { getUser, clearUser } = useUserStore();
  const { push } = Router;
  useEffect(() => {
    const qyBearerToken = localStorage.getItem('qyBearerToken') || ' ';
    if (qyBearerToken) {
      getUser().then((data) => {
        if (!data.user) {
          clearUserToken();
          clearUser();
          push('/login');
        }
        if (data.isRefresh) {
          setUserInfo(data.user);
        }
      });
    }
  }, []);
  return userInfo;
};

export default useFetchUserInfo;
