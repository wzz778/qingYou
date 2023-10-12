import { BASE_URL, TIME_OUT } from './config';
import HYrequest from './request';
const Hyrequire = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestSuccessFn(config) {
      const qyBearerToken = localStorage.getItem('qyBearerToken') || '';
      console.log(qyBearerToken);
      if (qyBearerToken.length !== 0) {
        config.headers!.Authorization = 'Bearer ' + qyBearerToken;
        // config.headers!['Content-Type'] = 'application/json';
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
      console.log('InternalAxiosRequestConfig拦截器2');
      return err;
    },
    responseSuccessFn: (res) => {
      console.log('InternalAxiosRequestConfig拦截器3');
      return res;
    },
    responseFailFn(err) {
      console.log('InternalAxiosRequestConfig拦截器4');
      return err;
    }
  }
});

export { Hyrequire, Hyrequire2 };
