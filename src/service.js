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
  console.log(error);
  return Promise.reject(error);
};

const service = axios.create({ baseURL: '/api' });
service.interceptors.request.use(defaultRequestConfig, defaultRequestError);
service.interceptors.response.use(defaultResponseSuccess, defaultResponseError);

export default service;
