import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue3-loading-overlay'; // vue3-loading-overlay
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import VueSweetalert2 from 'vue-sweetalert2'; // VueSweetalert2
import '../node_modules/sweetalert2/dist/sweetalert2.min.css';

// vee-validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules'; // 規則
import { localize, setLocale } from '@vee-validate/i18n'; // 語系
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// vue-easy-lightbox
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min';
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css';

import { createPinia } from 'pinia';
import { dateTime } from '@/utils/filters';

import App from './App.vue';
import router from './router';

// 載入規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

// 日期、千分位 方法
app.config.globalProperties.$filters = {
  dateTime,
};

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.use(VueEasyLightbox);
app.component('Loading', Loading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.provide('axios', app.config.globalProperties.axios); // provide 'axios'
app.mount('#app');
