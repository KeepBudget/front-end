import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const BASE_URL = '/api';
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(function (config) {
  const store = useUserStore();
  config.headers['accessToken'] = store.accessToken;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    if (response.headers.accesstoken) {
      const store = useUserStore();
      store.setAccessToken(response.headers.accesstoken);
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      const store = useUserStore();
      store.setAccessToken('');
      router.push({
        name: 'login',
      });
    }
    return error;
  },
);

export default instance;
