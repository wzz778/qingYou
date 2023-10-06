import http from '@/utils/http';

//登录

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

export type RegisterByEmail = {
  email: 'string';
  password: 'string';
  code: 'string';
  username: 'string';
};

export const sendCode = (email: string) =>
  http({
    url: '/email/sendEmail',
    method: 'get',
    // data: email
    params: {
      toMail: email
    }
  });
