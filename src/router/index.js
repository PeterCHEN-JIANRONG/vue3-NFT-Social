import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    // 前台頁
    path: '/',
    name: 'Home',
    component: () => import('../views/FrontEnd/FrontView.vue'),
    children: [
      {
        path: '',
        name: '全體動態牆',
        component: () => import('../views/FrontEnd/PostsView.vue'),
      },
      {
        path: 'composition',
        name: 'composition',
        component: () => import('../views/CompositionView.vue'),
      },
    ],
  },

  // 404 not found
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active', // router連結啟用時，增加的class
  // 切換頁面時滾至頂部
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
