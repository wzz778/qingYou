// import http from '@/utils/http';

import { Hyrequire } from '../';

// //登录

// 获取用户信息
export const getInfo = () => {
  return Hyrequire.get({
    url: '/user/name'
  });
};

interface UpdateUserDto {
  id: string;

  username?: string;

  nickname?: string;

  img?: string;

  password?: string;
}

export function updateUserInfo(params: UpdateUserDto) {
  return Hyrequire.put({
    url: '/user/updateUser',
    params
  });
}

export function upload(data: any) {
  return Hyrequire.post({
    url: '/user/file/upload',
    data
  });
}
