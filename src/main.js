import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { dateTime } from '@/libs/filters';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// 日期、千分位 方法
app.config.globalProperties.$filters = {
  dateTime,
};
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios); // provide 'axios'
app.mount('#app');
