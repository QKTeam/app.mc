import axios from 'axios';

const defaultRequestConfig = (config) => {
  const newConfig = config;
  newConfig.headers['Api-Token'] = window.localStorage['Api-Token'];
  newConfig.headers['Captcha-Token'] = window.localStorage['Captcha-Token'];
  return newConfig;
};

const defaultRequestError = error => Promise.reject(error);

const defaultResponseSuccess = response => response;

const defaultResponseError = (error) => {
  switch (error.response.status) {
    case 400:
      alert(error.response.data.message);
      break;
    case 401:
      alert(error.response.data.message);
      if (window.location.hash.split('/')[2].split('?')[0] === 'apply') {
        window.location.hash = `/auth/login?apply_id=${window.$router.query.get('id')}`;
      } else {
        window.location.hash = '/auth/login';
      }
      break;
    case 422:
      alert('请检查表单填写');
      break;
    default:
      break;
  }
  return Promise.reject(error);
};

const service = axios.create({ baseURL: '/mc/api' });
service.interceptors.request.use(defaultRequestConfig, defaultRequestError);
service.interceptors.response.use(defaultResponseSuccess, defaultResponseError);

export default service;
