import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import RealPriceView from '@/views/RealPriceView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView,
    },
    {
      path: '/real-price',
      name: 'realPrice',
      component: RealPriceView,
    },
  ],
});

export default router;
