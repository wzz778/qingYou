// import http from '@/utils/http';

import { Hyrequire } from '../';

// //登录

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

//模板接口
export const addEmailTemplates = (data: any) => {
  return Hyrequire.post({
    url: '/email/templates/addEmailTemplates',
    params: data
  });
};

export const updateEmailTemplates = (data: any) => {
  return Hyrequire.put({
    url: '/email/templates/updateEmailTemplates',
    params: data
  });
};

export const deleteEmailTemplates = (data: any) => {
  return Hyrequire.delete({
    url: `/email/templates/deleteEmailTemplates/${data}`
  });
};

export const queryEmailTemplatesPage = () => {
  return Hyrequire.get({
    url: '/email/templates/queryEmailTemplatesPage',
    params: {
      page: 1,
      limit: 10
    }
  });
};
