import { useUserStore } from '@/stores/user';
import instance from './base';

export const loginUser = async nickname => {
  try {
    const res = await instance.post('/users/login', {
      nickname,
    });
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
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (
  nickname,
  wishDistrictId,
  wishPropertyType,
  wishTradeType,
  wishPropertyPrice,
  wishPropertySize,
) => {
  try {
    const res = await instance.put('/users', {
      nickname,
      wishDistrictId,
      wishPropertyType,
      wishTradeType,
      wishPropertyPrice,
      wishPropertySize,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserWishDistrict = async wishDistrictId => {
  try {
    const res = await instance.patch('/users/wish-district', {
      wishDistrictId,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchUser = async () => {
  try {
    const res = await instance.get('/users');
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchUserRaw = async () => {
  try {
    const res = await instance.get('/users/raw');
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
