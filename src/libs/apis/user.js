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

export const signUpUser = async (
  nickname,
  wishDistrictId,
  wishPropertyType,
  wishTradeType,
  wishPropertyPrice,
  wishPropertySize,
) => {
  try {
    const res = await instance.post('/users/sign-up', {
      nickname,
      wishDistrictId,
      wishPropertyType,
      wishTradeType,
      wishPropertyPrice,
      wishPropertySize,
    });
    const store = useUserStore();
    store.setAccessToken(res.headers.accesstoken);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
