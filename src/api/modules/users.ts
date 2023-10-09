// import http from '@/utils/http';

import { Hyrequire } from '../';

// //登录

// 获取用户信息
export const getById = () => {
  return Hyrequire.get({
    url: 'user/getById/2'
  });
};
