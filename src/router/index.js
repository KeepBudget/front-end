import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import RealPriceView from '@/views/RealPriceView.vue';
import AccidentView from '@/views/AccidentView.vue';
import SentimentView from '@/views/SentimentView.vue';
import NavLayoutView from '@/views/NavLayoutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
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
      path: '',
      component: NavLayoutView,
      children: [
        {
          path: '/real-price',
          name: 'real-price',
          component: RealPriceView,
        },
        {
          path: '/sentiment',
          name: 'sentiment',
          component: SentimentView,
        },
        {
          path: '/accident',
          name: 'accident',
          component: AccidentView,
        },
      ],
    },
  ],
});

export default router;
