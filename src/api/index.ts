import { BASE_URL, TIME_OUT } from './config';
import HYrequest from './request';
const Hyrequire = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestSuccessFn(config) {
      const bearerToken = localStorage.getItem('bearerToken') || '';
      if (bearerToken.length !== 0) {
        // config.headers['authorization'] = 'Bearer ' + bearerToken;
      }
      return config;
    },
    requestFailFn: (err) => {
      return err;
    },
    responseSuccessFn: (res) => {
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
      console.log('InternalAxiosRequestConfig拦截器');
      return config;
    },
    requestFailFn: (err) => {
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
