import instance from './base';

export const fetchDistricts = async () => {
  try {
    const res = await instance.get('/districts');
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
