import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('');

  accessToken.value = localStorage.getItem('accessToken');

  const setAccessToken = newAccessToken => {
    localStorage.setItem('accessToken', newAccessToken);
    accessToken.value = newAccessToken;
  };

  return { accessToken, setAccessToken };
});
