import { Hyrequire } from '..';
//发送邮箱
export type RegisterByEmail = {
  email: 'string';
  password: 'string';
  code: 'string';
  username: 'string';
};

export const sendCode = (email: string) =>
  Hyrequire.get({
    url: '/email/sendEmail',
    // data: email
    params: {
      toMail: email
    }
  });

//检验邮箱：
export const checkEmail = (data: any) =>
  Hyrequire.post({
    url: '/email/checkEmail',
    // data: email
    params: data
  });
