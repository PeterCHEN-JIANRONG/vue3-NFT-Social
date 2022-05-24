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
        path: 'send',
        name: '張貼動態',
        component: () => import('../views/FrontEnd/SendPost.vue'),
      },
      {
        path: 'user/:id',
        name: '個人頁',
        component: () => import('../views/FrontEnd/PersonalView.vue'),
      },
      {
        path: 'tracks',
        name: '追蹤名單',
        component: () => import('../views/FrontEnd/TracksView.vue'),
      },
      {
        path: 'likes',
        name: '我按讚的文章',
        component: () => import('../views/FrontEnd/LikesView.vue'),
      },
      {
        path: 'profile',
        name: '修改個人資料',
        component: () => import('../views/FrontEnd/ProfileView.vue'),
      },
    ],
  },
  {
    path: '/signin',
    component: () => import('../views/FrontEnd/SignInView.vue'),
  },
  {
    path: '/signup',
    component: () => import('../views/FrontEnd/SignUpView.vue'),
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
