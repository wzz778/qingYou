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
}

export function updateUserInfo(data: UpdateUserDto) {
  return Hyrequire.put({
    url: '/user/update',
    data
  });
}
