import { useUserStore } from '@/stores/user';
import instance from './base';

export const loginUser = async nickname => {
  try {
    const res = await instance.post('/users/login', {
      nickname,
    });
    const store = useUserStore();
    store.setAccessToken(res.headers.accesstoken);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
