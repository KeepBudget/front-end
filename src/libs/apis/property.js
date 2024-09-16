import instance from './base';

export const fetchProperties = async (page, size) => {
  try {
    const res = await instance.get('/properties', {
      params: { page, size },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
