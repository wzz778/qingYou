import useUserStore from '@/store/user';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { clearUserToken } from '@/utils/common';
import useTeamStore from '@/store/team';
const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const { getUser, clearUser } = useUserStore();
  const { getTeam, setTeam, setTeamName, setTeamId } = useTeamStore();
  const { push } = Router;
  useEffect(() => {
    const qyBearerToken = localStorage.getItem('qyBearerToken') || '';
    const qyTeamId = localStorage.getItem('qyTeamId') || '';
    const qyTeamName = localStorage.getItem('qyTeamName') || '';
    if (qyBearerToken) {
      getUser()
        .then((data) => {
          if (!data.user) {
            // clearUserToken();
            // clearUser();
            // push('/login');
            return Promise.reject();
          } else {
            if (data.isRefresh) {
              setUserInfo(data.user);
            }
            if (!qyTeamId) {
              setTeamName(data.user.nickname);
            } else {
              setTeamName(qyTeamName);
              setTeamId(qyTeamId);
            }
            return Promise.resolve(data.user.id);
          }
        })
        .then((id) => {
          return getTeam(id);
        })
        .catch((err) => {});
    }
  }, []);
  return userInfo;
};

export default useFetchUserInfo;
