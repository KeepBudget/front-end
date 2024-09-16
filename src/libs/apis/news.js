import instance from './base';

export const fetchNewsList = async (page, size, category, status) => {
  try {
    const res = await instance.get('/news', {
      params: { page, size, category, status },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchNewsKeywords = async () => {
  try {
    const res = await instance.get('/news/keywords');
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchNewsSentiment = async () => {
  try {
    const res = await instance.get('/news/sentiment');
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
