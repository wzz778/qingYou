import { Handle401 } from '@/utils/http';
import { BASE_URL, TIME_OUT } from './config';
import HYrequest from './request';
const Hyrequire = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestSuccessFn(config) {
      const qyBearerToken = localStorage.getItem('qyBearerToken') || '';
      console.log(config);
      console.log('config');
      if (qyBearerToken.length !== 0) {
        config.headers!.Authorization = 'Bearer ' + qyBearerToken;
      }
      return config;
    },
    requestFailFn: (err) => {
      return err;
    },
    responseSuccessFn: (res: any) => {
      // console.log('responseSuccessFn');
      console.log(res);
      // if (res.code == 'ERR_BAD_REQUEST') {
      //   Handle401(res.message);
      // }
      return res;
    },
    responseFailFn(err) {
      console.log(err);
      return err;
    }
  }
});
const Hyrequire2 = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestSuccessFn(config) {
      return config;
    },
    requestFailFn: (err) => {
      console.log('请求出错!');
      return err;
    },
    responseSuccessFn: (res) => {
      return res;
    },
    responseFailFn(err) {
      return err;
    }
  }
});

export { Hyrequire, Hyrequire2 };
