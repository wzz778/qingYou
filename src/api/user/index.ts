import http from '@/utils/http';

//登录

// 获取首页其它信息
export const getHomeInfoData = () => {
  return http({
    url: '/types/type',
    method: 'get'
  });
};

// 获取用户信息
export const getInfo = () => {
  return http({
    url: '/types/type',
    method: 'get'
  });
};

// 获取用户信息
export const logout = () => {
  return http({
    url: '/types/type',
    method: 'get'
  });
};
