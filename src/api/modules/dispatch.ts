import { Hyrequire } from '../';
//邮箱调度crud
export const addEmailProgram = (data: any) => {
  return Hyrequire.post({
    url: '/email/quartz/saveJob',
    data
  });
};

export const updateEmailProgram = (params: any) => {
  return Hyrequire.put({
    url: '/email/quartz/rescheduleJob',
    params
  });
};

export const deleteEmailProgram = (id: any) => {
  return Hyrequire.delete({
    url: `/email/quartz/deleteEmailConfig/${id}`
  });
};

export const queryEmailProgramPersonal = (params: any) => {
  return Hyrequire.get({
    url: '/email/quartz/listJobsByGroupName',
    params
  });
};

//修改邮箱调度状态

export const pauseEmailProgram = (params: any) => {
  return Hyrequire.post({
    url: '/email/quartz/pauseJob',
    params
  });
};

export const beginEmailProgram = (params: any) => {
  return Hyrequire.post({
    url: '/email/quartz/resumeJob',
    params
  });
};
