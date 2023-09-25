import http from '@/utils/http';

// 获取首页其它信息
export const getHomeInfoData = () => {
  return http({
    url: '/types/type',
    method: 'get'
  });
};
