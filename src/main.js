import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Donut);

app.mount('#app');
