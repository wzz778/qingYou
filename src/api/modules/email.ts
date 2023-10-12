// import http from '@/utils/http';

import { Hyrequire } from '../';

// //登录

// 获取用户信息
export const queryEmailTemplatesPage = () => {
  return Hyrequire.get({
    url: '/email/templates/queryEmailTemplatesPage',
    params: {
      page: 1,
      limit: 10
    }
  });
};

// 获取用户信息
export const tryPage = () => {
  return Hyrequire.get({
    url: '/admin/findSelectResultTeacher/1/10'
    // params: {
    //   page: 1,
    //   size: 10
    // }
  });
};
