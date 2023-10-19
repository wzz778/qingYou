import { Hyrequire } from '../';

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
export const addEmailTemplates = (params: any) => {
  return Hyrequire.post({
    url: '/email/templates/addEmailTemplates',
    params
  });
};

export const updateEmailTemplates = (params: any) => {
  return Hyrequire.put({
    url: '/email/templates/updateEmailTemplates',
    params
  });
};

export const deleteEmailTemplates = (id: any) => {
  return Hyrequire.delete({
    url: `/email/templates/deleteEmailTemplates/${id}`
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

//邮箱配置
export const addEmailConfig = (data: any) => {
  return Hyrequire.post({
    url: '/email/config/addEmailConfig',
    params: data
  });
};

export const updateEmailConfig = (params: any) => {
  return Hyrequire.put({
    url: '/email/config/updateEmailConfig',
    params
  });
};

export const deleteEmailConfig = (id: any) => {
  return Hyrequire.delete({
    url: `/email/config/deleteEmailConfig/${id}`
  });
};

export const queryEmailConfigPersonal = (params: any) => {
  return Hyrequire.get({
    url: '/email/config/queryEmailConfigPersonal',
    params
  });
};

//邮箱发送
export const textMailKey = (params: any) => {
  return Hyrequire.get({
    url: '/email/superMails',
    params
  });
};

export const sendMail = (params: any) => {
  return Hyrequire.get({
    url: 'email/configMails',
    params
  });
};
