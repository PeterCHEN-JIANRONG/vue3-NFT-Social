import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { dateTime } from '@/libs/filters';

import Loading from 'vue3-loading-overlay'; // vue3-loading-overlay
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import VueSweetalert2 from 'vue-sweetalert2'; // VueSweetalert2
import '../node_modules/sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// 日期、千分位 方法
app.config.globalProperties.$filters = {
  dateTime,
};
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.component('Loading', Loading);
app.provide('axios', app.config.globalProperties.axios); // provide 'axios'
app.mount('#app');
